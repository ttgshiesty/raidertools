// Convenience re-exports of the normalized stats types, so the rest of the
// stats app can `import type { ... } from '../types'` instead of reaching
// into utils/ directly.
export type {
  StatsDashboardData,
  StatsBreakdownRow,
  StatsRoundRow,
  StatsMapRow,
  StatsTargetResolver,
  ResolverRecord,
} from '../utils/shiesty-arctracker-stats_generated';

export type { MetaForgeDashboardData } from '../utils/shiesty-metaforge-stats_generated';
