import { describe, expect, it } from 'vitest';
import { isValidMetaForgeProfileId, normalizeMetaForgeStats } from '../metaforgeApi';

describe('MetaForge stats contract', () => {
  it('preserves the exact player-stats field families', () => {
    const result = normalizeMetaForgeStats({
      stats: {
        user_id: '9888be36-c71f-4f79-8693-72a0720d105f',
        total_rounds: 1610,
        total_damage_dealt: 919148,
      },
      mapStats: [{ map_name: 'The Dam', rounds_played: 920 }],
      enemyStats: [{ enemy_name: 'Wasp', kills: 1194, damage: 133594 }],
      weaponStats: [{ weapon_name: 'Wolfpack', damage: 221454 }],
      totalDamageDealt: 919148,
      totalPlayerDowns: 150,
    });

    expect(result.stats.total_rounds).toBe(1610);
    expect(result.mapStats?.[0]).toMatchObject({ map_name: 'The Dam', rounds_played: 920 });
    expect(result.enemyStats?.[0]).toMatchObject({ enemy_name: 'Wasp', kills: 1194, damage: 133594 });
    expect(result.weaponStats?.[0]).toEqual({ weapon_name: 'Wolfpack', damage: 221454 });
    expect(result.totalPlayerDowns).toBe(150);
  });

  it('does not invent career arrays for reduced MetaForge responses', () => {
    const result = normalizeMetaForgeStats({ stats: { level: 0, credits: 700 } });
    expect(result.stats).toEqual({ level: 0, credits: 700 });
    expect(result.mapStats).toEqual([]);
    expect(result.enemyStats).toEqual([]);
    expect(result.weaponStats).toEqual([]);
  });

  it('validates linked profile ids', () => {
    expect(isValidMetaForgeProfileId('9888be36-c71f-4f79-8693-72a0720d105f')).toBe(true);
    expect(isValidMetaForgeProfileId('bad id')).toBe(false);
  });
});
