/**
 * arctracker-stats-resolver.ts
 *
 * Canonical map + enemy target ID -> display name resolver, built from the
 * documented ARC Raiders target ID list ("HOW-STATS-SHOULD-BE").
 *
 * Pass this into fetchArcTrackerStatsDashboard({ ..., resolver }) so that
 * enemy and map breakdown rows resolve to real names instead of falling
 * back to raw target IDs when a dedicated endpoint doesn't already include
 * a name.
 *
 * Note: two distinct target IDs (-742689897 and -636184135) both decode to
 * "The Dam" per the source doc — kept as separate resolver entries since
 * they're different raw IDs that should both resolve to the same name.
 */
import type {
  ResolverRecord,
  StatsTargetResolver,
} from './shiesty-arctracker-stats_generated';

function mapRecord(id: number, name: string): ResolverRecord {
  return {
    id,
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    type: 'map',
  };
}

function enemyRecord(id: number, name: string): ResolverRecord {
  return {
    id,
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    type: 'enemy',
  };
}

const MAPS: Record<string, ResolverRecord> = {
  '594749606': mapRecord(594749606, 'Spaceport'),
  '1519485851': mapRecord(1519485851, 'The Blue Gate'),
  '-2024805679': mapRecord(-2024805679, 'Stella Montis'),
  '-742689897': mapRecord(-742689897, 'The Dam'),
  '-636184135': mapRecord(-636184135, 'The Dam'),
  '-1973721684': mapRecord(-1973721684, 'Buried City'),
  '-21263888': mapRecord(-21263888, 'Riven Tides'),
};

const ENEMIES: Record<string, ResolverRecord> = {
  '672378114': enemyRecord(672378114, 'Wasp'),
  '664422097': enemyRecord(664422097, 'Hornet'),
  '-504231823': enemyRecord(-504231823, 'Pop'),
  '299263764': enemyRecord(299263764, 'Fireball'),
  '-1616729167': enemyRecord(-1616729167, 'Bastion'),
  '-1311527696': enemyRecord(-1311527696, 'Bombardier'),
  '-1562077677': enemyRecord(-1562077677, 'Spotter'),
  '1786451563': enemyRecord(1786451563, 'Snitch'),
  '913532953': enemyRecord(913532953, 'Turret'),
  '903845622': enemyRecord(903845622, 'Rocketeer'),
  '-541195755': enemyRecord(-541195755, 'Leaper'),
  '-352140120': enemyRecord(-352140120, 'Tick'),
  '2015925366': enemyRecord(2015925366, 'Shredder'),
  '-1122989322': enemyRecord(-1122989322, 'Sentinel'),
  '1143392102': enemyRecord(1143392102, 'ARC Surveyor'),
  '-1166795672': enemyRecord(-1166795672, 'Queen'),
  '1225943433': enemyRecord(1225943433, 'Matriarch'),
  '-1524715377': enemyRecord(-1524715377, 'Firefly'),
  '-1780443771': enemyRecord(-1780443771, 'Comet'),
  '1639912088': enemyRecord(1639912088, 'Vaporizer'),
  '-400146311': enemyRecord(-400146311, 'ARC Turbine'),
};

export const ARCTRACKER_RESOLVER: StatsTargetResolver = {
  resolvers: {
    maps: MAPS,
    enemies: ENEMIES,
  },
  specialTargetIds: {
    player: { id: 995408715, name: 'Player' },
    playerDamage: { id: 200993951, name: 'Player Damage' },
    squadmateRevive: { id: -12896838, name: 'Squadmate Revive' },
  },
};
