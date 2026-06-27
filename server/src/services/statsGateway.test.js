import assert from 'node:assert/strict';
import test from 'node:test';
import { fetchStatsOverview, storeExtensionStats } from './statsGateway.js';

test('fetchStatsOverview combines extension-only stats with direct ArcTracker rounds', async (t) => {
  const originalFetch = globalThis.fetch;
  process.env.ARC_APP_KEY = 'test-app-key';
  process.env.ARC_USER_KEY = 'arc_u1_test-user-key-one';
  const calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({
      url,
      appKey: init.headers['X-App-Key'],
      authorization: init.headers.Authorization,
    });
    const path = new URL(url).pathname;
    const bodies = {
      '/api/v2/user/profile': { userId: 'user-1', username: 'Raider', playerLevel: 10 },
      '/api/v2/user/rounds': { rounds: [{ id: 'round-1' }] },
    };
    return new Response(JSON.stringify(bodies[path]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };
  t.after(() => {
    globalThis.fetch = originalFetch;
    delete process.env.ARC_APP_KEY;
    delete process.env.ARC_USER_KEY;
  });

  storeExtensionStats({
    summary: { totalRounds: 10, totalExtracted: 6, totalDied: 4, totalArcKills: 20, totalPlayerKills: 2, totalValueExtracted: 1000, totalValueBroughtIn: 400 },
    enemyKills: { enemies: [{ name: 'Wasp', count: 8 }] },
    weaponKills: { weapons: [{ name: 'Anvil', count: 2 }] },
    mapPerformance: { maps: [{ mapName: 'Spaceport', raids: 3 }] },
  });
  const overview = await fetchStatsOverview();

  assert.equal(calls.length, 2);
  assert.ok(calls.every((call) => call.appKey === 'test-app-key'));
  assert.ok(calls.every((call) => call.authorization === 'Bearer arc_u1_test-user-key-one'));
  assert.equal(overview.summary.totalNetValue, 600);
  assert.equal(overview.enhanced_survival_metrics.overallSurvivalRate, 0.6);
  assert.equal(overview.topWeapons[0].name, 'Anvil');
  assert.equal(overview.topWeapons[0].count, 2);
  assert.equal(overview.recentRounds.length, 1);
  assert.equal(overview.recentRounds[0].id, 'round-1');
  assert.deepEqual(overview.warnings, []);
});

test('fetchStatsOverview keeps extension stats when ArcTracker rounds fail', async (t) => {
  const originalFetch = globalThis.fetch;
  process.env.ARC_APP_KEY = 'test-app-key';
  process.env.ARC_USER_KEY = 'arc_u1_test-user-key-two';
  globalThis.fetch = async (url) => {
    if (new URL(url).pathname.endsWith('/rounds')) {
      return new Response(JSON.stringify({ error: { message: 'temporarily unavailable' } }), { status: 503 });
    }
    return new Response('{}', { status: 200 });
  };
  t.after(() => {
    globalThis.fetch = originalFetch;
    delete process.env.ARC_APP_KEY;
    delete process.env.ARC_USER_KEY;
  });

  const overview = await fetchStatsOverview();
  assert.equal(overview.warnings.length, 1);
  assert.equal(overview.warnings[0].endpoint, '/api/v2/user/rounds');
});
