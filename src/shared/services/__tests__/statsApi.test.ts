import { describe, expect, it } from 'vitest';
import { normalizeStatsDashboardPayloads } from '../statsApi';

describe('stats dashboard API normalization', () => {
  it('normalizes the ARCTracker stats response family', () => {
    const result = normalizeStatsDashboardPayloads({
      summary: {
        totalTimeMs: 120_000,
        totalRounds: 2,
        totalExtracted: 1,
        totalDied: 1,
        totalArcKills: 7,
        totalValueExtracted: 5_000,
        totalNetValue: 3_000,
        totalPlayerKills: 2,
        totalContainersLooted: 12,
      },
      enemies: { enemies: [{ name: 'Wasp', count: 4 }] },
      weapons: { weapons: [{ name: 'Anvil', count: 2, itemId: 'anvil' }] },
      rounds: { rounds: [{ id: 9, mapName: 'The Dam', outcome: 'extracted', valueBroughtIn: 100, valueExtracted: 400, netValue: 300 }] },
      maps: { maps: [{ mapTargetId: 123, mapName: 'The Dam', raids: 2, extracted: 1, totalDurationMs: 120_000, totalNetValue: 3_000 }] },
      fetchedAt: '2026-06-20T12:00:00.000Z',
    });

    expect(result.summary.totalArcKills).toBe(7);
    expect(result.enemies).toEqual([{ name: 'Wasp', count: 4 }]);
    expect(result.weapons[0]).toEqual({ name: 'Anvil', count: 2, itemId: 'anvil' });
    expect(result.rounds[0]).toMatchObject({ roundId: '9', outcome: 'extracted', netValue: 300 });
    expect(result.maps[0]).toMatchObject({ key: '123', mapName: 'The Dam', raids: 2 });
  });

  it('accepts API responses wrapped in data', () => {
    const result = normalizeStatsDashboardPayloads({
      summary: { data: { totalRounds: '3' } },
      enemies: { data: { enemies: [] } },
      weapons: { data: { weapons: [] } },
      rounds: { data: { rounds: [] } },
      maps: { data: { maps: [] } },
    });
    expect(result.summary.totalRounds).toBe(3);
  });

  it('uses numeric stats-player-v2 event IDs for raw aggregate and round payloads', () => {
    const result = normalizeStatsDashboardPayloads({
      summary: {
        scopedPlayerStats: [{ playerStats: [
          { eventId: 9800, targetId: -2025830978, amount: 2 },
          { eventId: 9801, targetId: -2025830978, amount: 1 },
          { eventId: 9802, targetId: -2025830978, amount: 1 },
          { eventId: 9803, targetId: -2025830978, amount: 300_000 },
          { eventId: 9804, targetId: -2025830978, amount: 1_000 },
          { eventId: 9805, targetId: -2025830978, amount: 4_000 },
          { eventId: 200, targetId: 995408715, amount: 3 },
          { eventId: 501, amount: 8 },
        ] }],
      },
      enemies: { enemies: [] },
      weapons: { weapons: [] },
      rounds: { rounds: [{ roundId: 'coded-round', stats: [
        { eventId: 9801, targetId: -2025830978, amount: 1 },
        { eventId: 9804, amount: 500 },
        { eventId: 9805, amount: 2_000 },
      ] }] },
      maps: { maps: [] },
    });

    expect(result.summary).toMatchObject({
      totalRounds: 2,
      totalExtracted: 1,
      totalDied: 1,
      totalPlayerKills: 3,
      totalContainersLooted: 8,
      totalNetValue: 3_000,
    });
    expect(result.rounds[0]).toMatchObject({
      roundId: 'coded-round',
      outcome: 'extracted',
      valueBroughtIn: 500,
      valueExtracted: 2_000,
      netValue: 1_500,
    });
  });

  it('falls back by field to the documented raid-history fields when the summary endpoint is empty', () => {
    const result = normalizeStatsDashboardPayloads({
      summary: {}, enemies: {}, weapons: {}, maps: {},
      rounds: { rounds: [{ id: 'raid-1', outcome: 'extracted', mapName: 'Spaceport', durationMs: 120_000, valueExtracted: 900, valueBroughtIn: 200, netValue: 700, arcKills: 4, containersLooted: 6 }] },
    });
    expect(result.summary).toMatchObject({ totalRounds: 1, totalExtracted: 1, totalTimeMs: 120_000, totalArcKills: 4, totalContainersLooted: 6, totalValueExtracted: 900, totalNetValue: 700 });
    expect(result.rounds[0]).toMatchObject({ roundId: 'raid-1', mapName: 'Spaceport', outcome: 'extracted', netValue: 700 });
  });

  it('accepts raw round arrays and rawStats compatibility events', () => {
    const result = normalizeStatsDashboardPayloads({ summary: {}, enemies: {}, weapons: {}, maps: {}, rounds: [{ id: 'raw', rawStats: [{ eventId: 9801, amount: 1 }, { eventId: 9805, amount: 300 }] }] });
    expect(result.rounds[0]).toMatchObject({ roundId: 'raw', outcome: 'extracted', valueExtracted: 300 });
  });
});
