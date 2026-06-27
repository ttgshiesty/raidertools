import express from 'express';
import { ArcTrackerAPI } from '../services/arctracker.js';

const router = express.Router();

function userKey() {
  const key = process.env.ARC_USER_KEY?.trim();
  if (!key?.startsWith('arc_u1_')) throw new Error('ARC_USER_KEY must start with arc_u1_');
  return key;
}

function options(query) {
  return {
    locale: query.locale,
    page: query.page,
    per_page: query.per_page ?? query.perPage,
    sort: query.sort,
    filter: query.filter,
    limit: query.limit,
    offset: query.offset,
    outcome: query.outcome,
    map: query.map,
    season: query.season,
    dateFrom: query.date_from ?? query.dateFrom,
    dateTo: query.date_to ?? query.dateTo,
  };
}

const handlers = {
  profile: (query) => ArcTrackerAPI.getProfile(userKey(), query),
  stash: (query) => ArcTrackerAPI.getStash(userKey(), query),
  loadout: (query) => ArcTrackerAPI.getLoadout(userKey(), query),
  quests: (query) => ArcTrackerAPI.getQuests(userKey(), query),
  hideout: (query) => ArcTrackerAPI.getHideout(userKey(), query),
  projects: (query) => ArcTrackerAPI.getProjects(userKey(), query),
  rounds: (query) => ArcTrackerAPI.getRounds(userKey(), query),
  blueprints: (query) => ArcTrackerAPI.getBlueprints(userKey(), query),
};

router.get('/:resource', async (req, res) => {
  const handler = handlers[req.params.resource];
  if (!handler) return res.status(404).json({ error: 'Unknown ArcTracker resource' });

  try {
    return res.json(await handler(options(req.query)));
  } catch (error) {
    return res.status(Number(error.status) || 502).json({
      error: error.message || 'ArcTracker request failed',
      code: error.code || 'ARCTRACKER_UPSTREAM_FAILED',
    });
  }
});

export default router;
