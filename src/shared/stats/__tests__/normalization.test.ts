import { beforeEach, describe, expect, it } from 'vitest';
import {
  CanonicalEntityIndex,
  EMBARK_EVENT_IDS,
  PLAYER_DAMAGE_TARGET_ID,
  PLAYER_TARGET_ID,
  SQUADMATE_REVIVE_TARGET_ID,
  createPlayerStatsSnapshot,
  createRoundStatsSnapshot,
  createItemEntityIndex,
  clearStatsSnapshots,
  loadPlayerStatsSnapshot,
  loadRoundStatsSnapshot,
  normalizeStatsRound,
  normalizeStatsPlayerV2,
  normalizeStatsTotals,
  resolveStatTarget,
  savePlayerStatsSnapshot,
  saveRoundStatsSnapshot,
  summarizeStatsRounds,
} from '../normalization';
import { setRaiderBuddyCacheOwner } from '../../services/raiderBuddyCache';

beforeEach(() => {
  localStorage.clear();
  setRaiderBuddyCacheOwner('test-user');
});

describe('canonical entity index', () => {
  it('resolves slugs, aliases, names, and preserved source IDs', () => {
    const index = new CanonicalEntityIndex([{
      kind: 'item',
      slug: 'advanced_mechanical_components',
      displayName: 'Advanced Mechanical Components',
      aliases: ['Advanced Mech Components'],
      sourceIds: { itemId: 'advanced_mechanical_components', gameAssetId: -926389249, publicUuid: 'uuid-1' },
    }]);

    expect(index.resolve('advanced-mechanical-components')?.entity.slug).toBe('advanced_mechanical_components');
    expect(index.resolve('Advanced Mech Components')?.matchedBy).toBe('alias');
    expect(index.resolve(-926389249, 'gameAssetId')?.entity.slug).toBe('advanced_mechanical_components');
    expect(index.resolve('uuid-1', 'publicUuid')?.entity.displayName).toBe('Advanced Mechanical Components');
  });

  it('builds the canonical catalog from items.en.json', () => {
    const index = createItemEntityIndex();
    const kettle = index.resolve(209734646, 'weaponAssetId');
    expect(kettle?.entity).toMatchObject({
      kind: 'weapon',
      slug: 'kettle_i',
      displayName: 'Kettle I',
    });
    expect(kettle?.entity.source).toMatchObject({ rarity: 'Common', type: 'Assault Rifle' });
    expect(index.resolve(923438116, 'gameAssetId')?.entity.slug).toBe('adrenaline_shot');
  });
});

describe('event-aware target resolution', () => {
  it('uses eventId to distinguish the same numeric domain', () => {
    expect(resolveStatTarget({ eventId: 9800, targetId: 594749606 })?.kind).toBe('map');
    expect(resolveStatTarget({ eventId: 200, targetId: 672378114 })?.canonicalSlug).toBe('wasp');
    expect(resolveStatTarget({ eventId: 202, targetId: 209734646 })?.canonicalSlug).toBe('kettle_i');
  });

  it('preserves undocumented IDs instead of inventing mappings', () => {
    expect(resolveStatTarget({ eventId: 200, targetId: 123456789 })).toEqual({
      kind: 'enemy',
      known: false,
      sourceId: 123456789,
      canonicalSlug: null,
      displayName: 'Unknown enemy (123456789)',
    });
  });
});

describe('round stats normalization', () => {
  it('decodes canonical totals and attribution without double counting', () => {
    const round = normalizeStatsRound({
      roundId: 'round-1',
      stats: [
        { eventId: 9801, targetId: 594749606, amount: 1 },
        { eventId: 9803, amount: 120_000 },
        { eventId: 9804, amount: 500 },
        { eventId: 9805, amount: 2_000 },
        { eventId: 100, targetId: 672378114, amount: 300 },
        { eventId: 100, targetId: PLAYER_DAMAGE_TARGET_ID, amount: 50 },
        { eventId: 102, weaponAssetId: 209734646, amount: 350 },
        { eventId: 200, targetId: 672378114, amount: 2 },
        { eventId: 200, targetId: PLAYER_TARGET_ID, amount: 1 },
        { eventId: 202, weaponAssetId: 209734646, amount: 3 },
        { eventId: 204, targetId: PLAYER_TARGET_ID, amount: 1 },
        { eventId: 400, targetId: SQUADMATE_REVIVE_TARGET_ID, amount: 1 },
        { eventId: 501, amount: 4 },
        { eventId: 600, targetId: 'adrenaline_shot', amount: 2 },
        { eventId: 9902, amount: 800 },
        { eventId: 12345, targetId: 9, amount: 7 },
      ],
    });

    expect(round).toMatchObject({
      outcome: 'extracted',
      extracted: true,
      durationMs: 120_000,
      damage: 350,
      arcDamage: 300,
      playerDamage: 50,
      arcKills: 2,
      playerKills: 1,
      playerDowns: 1,
      revives: 1,
      squadmateRevives: 1,
      containersLooted: 4,
      itemsCrafted: 2,
      xpGained: 800,
      netValue: 1_500,
    });
    expect(round.killsByWeapon[0]).toMatchObject({ amount: 3, target: { canonicalSlug: 'kettle_i' } });
    expect(round.craftedItems[0]).toMatchObject({ amount: 2, target: { canonicalSlug: 'adrenaline_shot' } });
    expect(round.unknownEvents).toHaveLength(1);

    const summary = summarizeStatsRounds([round]);
    expect(summary).toMatchObject({ roundsPlayed: 1, roundsExtracted: 1, damage: 350, playerKills: 1, arcKills: 2 });
  });

  it('exposes the exact event constants', () => {
    expect(EMBARK_EVENT_IDS.containersLooted).toBe(501);
    expect(EMBARK_EVENT_IDS.mapPlayed).toBe(9800);
  });
});

describe('provider vocabulary normalization', () => {
  it('normalizes supported field variants without discarding zeroes', () => {
    expect(normalizeStatsTotals({
      totalDamageDealt: '1200',
      kills: 4,
      arcEnemyKills: 9,
      valueExtracted: 6_000,
      valueBroughtIn: 1_500,
      durationSeconds: 90,
      outcome: 'RETURNED SAFELY',
      totalContainersLooted: 12,
      itemExtractions: 18,
    })).toEqual({
      damage: 1_200,
      playerKills: 4,
      arcKills: 9,
      lootValue: 6_000,
      loadoutValue: 1_500,
      durationMs: 90_000,
      extracted: true,
      containersLooted: 12,
      itemsExtracted: 18,
    });
  });

  it('normalizes aggregate stats-player-v2 events and map performance', () => {
    const raw = {
      scopedPlayerStats: [{ playerStats: [
        { eventId: 9800, targetId: 594749606, amount: 10 },
        { eventId: 9801, targetId: 594749606, amount: 7 },
        { eventId: 9802, targetId: 594749606, amount: 3 },
        { eventId: 9803, targetId: 594749606, amount: 600_000 },
        { eventId: 9804, targetId: 594749606, amount: 2_000 },
        { eventId: 9805, targetId: 594749606, amount: 8_000 },
        { eventId: 100, targetId: 672378114, amount: 900 },
        { eventId: 200, targetId: 672378114, amount: 4 },
        { eventId: 200, targetId: PLAYER_TARGET_ID, amount: 2 },
        { eventId: 202, targetId: 209734646, amount: 6 },
        { eventId: 204, targetId: PLAYER_TARGET_ID, amount: 3 },
        { eventId: 400, targetId: SQUADMATE_REVIVE_TARGET_ID, amount: 1 },
        { eventId: 400, targetId: PLAYER_TARGET_ID, amount: 2 },
        { eventId: 501, amount: 12 },
      ] }],
    };
    expect(normalizeStatsPlayerV2(raw)).toMatchObject({
      roundsPlayed: 10,
      roundsExtracted: 7,
      roundsKnockedOut: 3,
      durationMs: 600_000,
      damage: 900,
      playerKills: 2,
      arcKills: 4,
      playerDowns: 3,
      squadmateRevives: 1,
      strangerRevives: 2,
      containersLooted: 12,
      valueBroughtIn: 2_000,
      valueExtracted: 8_000,
      netValue: 6_000,
      enemyKills: [{ amount: 4, target: { canonicalSlug: 'wasp' } }],
      weaponKills: [{ amount: 6, target: { canonicalSlug: 'kettle_i' } }],
      mapPerformance: [{
        roundsPlayed: 10,
        roundsExtracted: 7,
        roundsKnockedOut: 3,
        netValue: 6_000,
        map: { canonicalSlug: 'spaceport' },
      }],
    });
  });
});

describe('stats local snapshots', () => {
  it('persists and restores normalized round and player snapshots', () => {
    const fetchedAt = '2026-06-18T12:00:00.000Z';
    const rounds = createRoundStatsSnapshot([{
      roundId: '2',
      stats: [
        { eventId: 200, targetId: PLAYER_TARGET_ID, amount: 1 },
        { eventId: 501, amount: 3 },
      ],
    }], 'stats-player-v2', fetchedAt);
    const player = createPlayerStatsSnapshot({ damageDealt: 500, kills: 2 }, 'arctracker', fetchedAt);

    expect(saveRoundStatsSnapshot(rounds)).toBe(true);
    expect(savePlayerStatsSnapshot(player)).toBe(true);
    expect(loadRoundStatsSnapshot()).toMatchObject({
      schemaVersion: 1,
      source: 'stats-player-v2',
      fetchedAt,
      summary: { playerKills: 1, containersLooted: 3 },
    });
    expect(loadPlayerStatsSnapshot()).toMatchObject({
      schemaVersion: 1,
      source: 'arctracker',
      totals: { damage: 500, playerKills: 2 },
      aggregate: null,
      raw: { damageDealt: 500, kills: 2 },
    });

    clearStatsSnapshots();
    expect(loadRoundStatsSnapshot()).toBeNull();
    expect(loadPlayerStatsSnapshot()).toBeNull();
  });

  it('removes corrupt snapshots instead of leaking invalid state', () => {
    localStorage.setItem('embark_cache_round_stats', '{bad-json');
    expect(loadRoundStatsSnapshot()).toBeNull();
    expect(localStorage.getItem('embark_cache_round_stats')).toBeNull();
  });

  it('rejects snapshots owned by another user', () => {
    const player = createPlayerStatsSnapshot({ damage: 10 }, 'arctracker');
    expect(savePlayerStatsSnapshot(player)).toBe(true);
    setRaiderBuddyCacheOwner('different-user');
    expect(loadPlayerStatsSnapshot()).toBeNull();
  });
});
