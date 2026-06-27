
  // Master MetaForge Proxy
  app.get("/api/metaforge/*", async (req, res) => {
    let subpath = req.params[0] || '';
    if (subpath.startsWith('/')) subpath = subpath.substring(1);
    
    const segments = subpath.split('/');
    const lastSegment = segments[segments.length - 1];
    const query = new URLSearchParams(req.query as any).toString();
    
    // Determine if it's a structural raider/stats request or a global one
    const isIdRequest = lastSegment.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    
    const urlsToTry = [];

    if (isIdRequest) {
      const id = lastSegment;
      urlsToTry.push(
        `https://metaforge.app/api/arc-raiders/raider/${id}${query ? `?${query}` : ''}`,
        `https://metaforge.app/api/arc-raiders/stats/${id}${query ? `?${query}` : ''}`,
        `https://metaforge.app/api/player/${id}${query ? `?${query}` : ''}`,
        `https://metaforge.app/api/raider/${id}${query ? `?${query}` : ''}`,
        `https://metaforge.app/api/stats/${id}${query ? `?${query}` : ''}`,
        `https://metaforge.app/api/arc-raiders/raider?id=${id}${query ? `&${query}` : ''}`,
        `https://metaforge.app/api/stats?id=${id}${query ? `&${query}` : ''}`,
        `https://metaforge.app/api/arc-raiders/${subpath}${query ? `?${query}` : ''}`,
        `https://metaforge.app/api/${subpath}${query ? `?${query}` : ''}`
      );
    } else {
      // Global endpoints like weekly-trials, map-data, etc.
      urlsToTry.push(
        `https://metaforge.app/api/arc-raiders/${subpath}${query ? `?${query}` : ''}`,
        `https://metaforge.app/api/${subpath}${query ? `?${query}` : ''}`
      );
      
      // Special aliases
      if (subpath === 'weekly-trials' || subpath === 'trials') {
        urlsToTry.unshift(`https://metaforge.app/api/arc-raiders/weekly-trials${query ? `?${query}` : ''}`);
        urlsToTry.unshift(`https://metaforge.app/api/weekly-trials${query ? `?${query}` : ''}`);
      }
      if (subpath === 'event_timers' || subpath === 'metaforge-events') {
        urlsToTry.unshift(`https://metaforge.app/api/arc-raiders/event_timers${query ? `?${query}` : ''}`);
      }
    }
    
    for (const url of urlsToTry) {
        try {
            // console.log(`[MetaForge] Proxying Attempt: ${url}`);
            const response = await fetchWithTimeout(url, { 
              timeout: 10000,
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                'Accept': 'application/json',
                'Referer': 'https://metaforge.app/'
              }
            });
            
            if (!response.ok) {
              // Silently retry others instead of logging 404s constantly
              continue;
            }

            const data = await response.json();
            return res.json(data);
        } catch (error: any) {
            // Ignore timeout loops
        }
    }

    // If we get here, all attempts failed (keep log minimal)
    console.warn(`[MetaForge] Sync for ${lastSegment} delayed - downstream API offline.`);
    res.status(200).json({ 
      error: false, 
      isOffline: true,
      message: "Upstream API unavailable",
      active: {}, // Match expecting structure for weekly-trials
      blueprints: [],
      codex: {},
      combatMetrics: {},
      raidHistory: []
    });
  });


          // USE ENGINE FOR LIVE DATA AGGREGATION
          const stats = await ApiEngine.getPlayerStats(userKey, metaforgeId, discordId);
          const p = stats.profile?.data || stats.profile || {};
          const m = stats.combatMetrics || {};

  // Stub: since user key storage is offline, instruct to pass metaforge API key or use env key
          const userKey = getMasterUserKey();
          const metaforgeId = "N/A";

          if (!userKey) return message.reply('TOKEN_MISSING: ArcTracker master key missing from environment.');

          // USE ENGINE FOR LIVE DATA AGGREGATION
          const stats = await ApiEngine.getPlayerStats(userKey, metaforgeId, discordId);
          const p = stats.profile?.data || stats.profile || {};
          const m = stats.combatMetrics || {};

          const embed = new EmbedBuilder()
            .setColor('#39FF14')
            .setTitle(`OPERATIVE_STATS: ${p.username || message.author.username}`)
            .setDescription(`**DEEP_SCAN_COMPLETE** - Intel retrieved via encrypted Syndicate relay.`)
            .addFields(
              { name: '💰 NET_VALUE', value: `$${(m.netProfit || p.net_worth || 0).toLocaleString()}`, inline: true },
              { name: '🛸 RAIDS', value: `${m.totalRaids || p.total_raids || 0}`, inline: true },
              { name: '🛡️ SURVIVAL', value: `${m.survivalRate || p.survival_rate || 0}%`, inline: true },
              { name: '💀 ARC_KILLS', value: `${(m.arcDestroyed || 0).toLocaleString()}`, inline: true },
              { name: '🔫 PvP_KILLS', value: `${(m.pvpKills || 0).toLocaleString()}`, inline: true },
              { name: '⚡ STREAK', value: `${m.demonStreak || 0}`, inline: true }
            )
            .setFooter({ text: 'UPLINK_STABLE // PROXY: AI_STUDIO' })
            .setTimestamp();

          message.reply({ embeds: [embed] });
        } catch (err) {
          console.error('[Bot] Stats error:', err);
          message.reply('SYNC_ERROR: Failed to retrieve operative intel. Sector interference detected.');
        }
      }

const files = [
  { url: 'https://raw.githubusercontent.com/wangyz1999/arcforge/main/app/layout.tsx', path: 'layout.tsx' },
  { url: 'https://raw.githubusercontent.com/wangyz1999/arcforge/main/app/config/rarityConfig.ts', path: 'rarityConfig.ts' },
  { url: 'https://raw.githubusercontent.com/wangyz1999/arcforge/main/data/items_database.json', path: 'items_database.json' },
  { url: 'https://raw.githubusercontent.com/wangyz1999/arcforge/main/app/config/categoryConfig.ts', path: 'categoryConfig.ts' },
  { url: 'https://raw.githubusercontent.com/wangyz1999/arcforge/main/app/config/cytoscapeStyles.ts', path: 'cytoscapeStyles.ts' },
  { url: 'https://raw.githubusercontent.com/wangyz1999/arcforge/main/data/special_item_types.json', path: 'special_item_types.json' }
];






=======================================================


const API_BASE = '/api/metaforge'; 
import { env } from '../lib/env';

export async function fetchRaiderStats(raiderId: string) {
  try {
    const cleanId = raiderId.trim().replace(/\s/g, '');
    // Ensure absolute URL for fetch to prevent 'Failed to parse URL' errors
    const origin = typeof window !== 'undefined' ? window.location.origin : `http://127.0.0.1:${env.PORT || 3000}`;
    const url = `${origin}${API_BASE}/stats/${cleanId}`;
    
    console.log(`[MetaForge] Attempting fetch: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP_${response.status}`);
    
    // Validate JSON response
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("[MetaForge] Server sent HTML instead of JSON. Check backend logs.");
      return null;
    }
    
    return await response.json();
  } catch (error: any) {
    console.error(`[MetaForge] Fetch failed: ${error.message}`);
    return null;
  }
};

export async function fetchMetaForge(endpoint: string, query = '') {
  const origin = typeof window !== 'undefined' ? window.location.origin : `http://127.0.0.1:${env.PORT || 3000}`;
  const url = `${origin}${API_BASE}/${endpoint}${query ? '?' + query : ''}`;
  console.log(`DEBUG: Frontend MetaForge request to: ${url}`);
    
  try {
    const response = await fetch(url, {
      headers: { 'Accept': 'application/json' },
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error(`[MetaForge] Server responded with ${response.status}: ${errorText}`);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    // Validate JSON response
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("[MetaForge] Server sent HTML instead of JSON. Check backend logs.");
      throw new Error("Invalid response format (not JSON)");
    }
    
    return await response.json();
  } catch (error: any) {
    console.error(`[MetaForge] API error: ${error.message}, URL tried: ${url}`);
    return { error: true, msg: error.message };
  }
}

export async function fetchMetaForgeMap() {
  const origin = typeof window !== 'undefined' ? window.location.origin : `http://127.0.0.1:${env.PORT || 3000}`;
  const url = `${origin}${API_BASE}/game-map-data`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP_${response.status}`);
    
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("[MetaForge] Map API sent HTML instead of JSON.");
      return null;
    }
    
    return await response.json();
  } catch (error: any) {
    console.error(`[MetaForge] Map fetch failed: ${error.message}`);
    return null;
  }
}
import { fetchArcTracker, fetchV1Personal, fetchXboxStash } from './arcTracker.js';
import { fetchMetaForge } from './metaforge.js';
import { fetchArdb } from './ardb.js';
import axios from 'axios';
import { env } from '../lib/env';

export class ApiEngine {
  static async getPlayerStats(userKey?: string, metaforgeId?: string, userDiscordId?: string) {
    // FAIL-SAFE: Look for any valid personal key version
    const finalUserKey = (userKey && userKey !== 'undefined') ? userKey : env.ARCTRACKER_USER_KEY;
    
    const finalMetaforgeId = (metaforgeId && metaforgeId !== 'undefined') ? metaforgeId : env.METAFORGE_USER_ID;

    console.log(`[ApiEngine] Using keys: Arc=${!!finalUserKey}, Meta=${!!finalMetaforgeId}`);

    let raidHistory: any[] = [];
    let machineCodex: any = {};
    let combatMetrics: any = {};
    let progression: any = {};
    let profile: any = {};
    let loadout: any = {};

    // Removed Firestore usage - decouple entirely
    
    // Update variables based on results
    const effectiveUserKey = finalUserKey || userKey;
    const effectiveMetaforgeId = finalMetaforgeId || metaforgeId;

    try {
      if (effectiveUserKey) {
        // Fetch rounds/history
        const roundsRes = await fetchArcTracker('rounds', 'limit=50', effectiveUserKey);
        raidHistory = roundsRes?.data?.rounds || roundsRes?.rounds || [];
        
        // Fetch full profile for progression and stash
        const profileRes = await fetchArcTracker('profile', '', effectiveUserKey);
        profile = profileRes.data || profileRes;
        const p = profile;
        
        // Fetch specific loadout
        try {
          const loadoutRes = await fetchArcTracker('loadout', '', effectiveUserKey);
          loadout = loadoutRes.data || loadoutRes;
        } catch (le: any) {
          console.warn("[ApiEngine] Loadout fetch failed:", le.message);
        }

        // Fetch Hideout Data
        let hideoutModules = [];
        try {
          const hideoutRes = await fetchArcTracker('hideout', '', effectiveUserKey);
          hideoutModules = hideoutRes?.data?.modules || hideoutRes?.modules || [];
        } catch (he: any) {
          console.warn("[ApiEngine] Hideout fetch failed:", he.message);
        }
        
        let stashRes = await fetchXboxStash(effectiveUserKey);
        if (!stashRes || stashRes.error || !stashRes.data) {
          stashRes = await fetchArcTracker('stash', 'per_page=500', effectiveUserKey);
        }
        const stashItems = stashRes?.data?.items || stashRes?.items || [];

        // Economy Logic
        const stashValue = stashItems.reduce((acc: number, item: any) => acc + (item.value || 0) * (item.quantity || 1), 0);
        const trashValue = stashItems.filter((i: any) => i.rarity === 'Common').reduce((acc: number, item: any) => acc + (item.value || 0) * (item.quantity || 1), 0);

        progression = {
          unlockedNodes: p.nodes_unlocked || 0,
          workbenchLevel: p.workbench_levels || {},
          hideoutModules,
          blueprints: {
            total: p.blueprints_unlocked || 0,
            extras: stashItems.filter((i: any) => i.type === 'Blueprint' && i.quantity > 1).length
          },
          stashValue,
          trashValue,
          liquidCash: p.raider_dollars || 0,
          totalWeight: stashItems.reduce((acc: number, item: any) => acc + (item.weight || 0) * (item.quantity || 1), 0),
          skillTree: p.skill_tree || { combat: [], tech: [], survival: [] }
        };
      }

      if (effectiveMetaforgeId) {
        // Fetch exhaustive stats from MetaForge using the raider specific endpoint
        const mfStats = await fetchMetaForge(`raider/${effectiveMetaforgeId}`);
        
        let statsData = mfStats || {};
        if (!mfStats || mfStats.error || mfStats.total_profit === undefined) {
          console.warn("[ApiEngine] MetaForge raider sync failure, checking fallback stats...");
          // Try legacy endpoint if raider fails or return error
          const legacyStats = await fetchMetaForge(`stats/${effectiveMetaforgeId}`);
          if (legacyStats && !legacyStats.error) {
            Object.assign(statsData, legacyStats);
          }
        }

        if (statsData && !statsData.error) {
          const rawCodex = statsData.arc_destroyed_breakdown || statsData.machine_kills || statsData.codex || {};
          
          // Deep crawl rawCodex for number values to extract ALL kills regardless of structure
          machineCodex = { other: {} };
          const crawlCodex = (obj: any, prefix = '') => {
             if (typeof obj !== 'object' || obj === null) return;
             for (const [k, v] of Object.entries(obj)) {
                 if (typeof v === 'number' && v > 0) {
                     // Try to make the name look nice
                     const cleanName = k.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                     machineCodex.other[cleanName] = (machineCodex.other[cleanName] || 0) + v;
                 } else if (typeof v === 'object') {
                     crawlCodex(v, `${k}_`);
                 }
             }
          };
          crawlCodex(rawCodex);


          // Same thing for weapons, often nested under 'weapon_performance', 'weapons', or nested map
          let weaponList: any = {};
          const rawWeapons = statsData.weapon_performance || statsData.weapon_stats || statsData.weapons || {};
          const crawlWeapons = (obj: any) => {
             if (typeof obj !== 'object' || obj === null) return;
             for (const [k, v] of Object.entries(obj)) {
                 if (typeof v === 'number' && k.includes('kills') && v > 0) {
                      const cleanName = k.replace(/_kills/g, '').replace(/kills_/g, '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                      if (!weaponList[cleanName]) weaponList[cleanName] = { kills: 0 };
                      weaponList[cleanName].kills += v;
                 } else if (typeof v === 'object' && v !== null && (v as any).kills !== undefined) {
                      const cleanName = k.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                      weaponList[cleanName] = { kills: (v as any).kills };
                 } else if (typeof v === 'object') {
                     crawlWeapons(v); // Go deeper
                 }
             }
          };
          crawlWeapons(rawWeapons);

          combatMetrics = {
            totalProfit: statsData.total_profit ?? 0,
            netProfit: statsData.net_profit ?? statsData.total_profit ?? 0,
            valueExtracted: statsData.value_extracted ?? statsData.gross_profit ?? 0,
            averageProfitPerExtraction: statsData.avg_profit_per_extraction ?? statsData.average_profit_per_extraction ?? 0,
            containersLooted: statsData.containers_looted ?? 0,
            stashValue: statsData.stash_value ?? 0,
            totalKills: statsData.total_kills ?? 0,
            pvpKills: statsData.player_kills ?? statsData.player_kills_as_raider ?? statsData.pvp_kills ?? 0,
            arcDestroyed: statsData.arc_enemies_destroyed ?? statsData.arc_destroyed ?? 0,
            survivalRate: statsData.survival_rate ?? 0,
            extractionRate: statsData.extraction_rate ?? (statsData.extracted && statsData.died ? Math.round((statsData.extracted / (statsData.extracted + statsData.died)) * 100) : 0),
            totalRaids: statsData.total_raids ?? (statsData.extracted && statsData.died ? statsData.extracted + statsData.died : 0),
            extractedCount: statsData.extracted ?? statsData.extracted_count ?? 0,
            
            favoriteWeapon: statsData.favorite_weapon || statsData.top_weapon || "",
            accuracy: statsData.accuracy || 0,
            shotsFired: statsData.shots_fired || 0,
            shotsHit: statsData.shots_hit || 0,
            headshotPercentage: statsData.headshot_rate || statsData.headshot_percentage || 0,
            weakpointHits: statsData.weakpoint_hits || 0,
            longestKillDistance: statsData.longest_kill || statsData.longest_kill_distance || 0,
            meleeKills: statsData.melee_kills || 0,
            damageDealt: statsData.damage_dealt || 0,
            damageReceived: statsData.damage_received || 0,
            shieldDamage: statsData.shield_damage || 0,
            armorDamage: statsData.armor_damage || 0,
            timesRevived: statsData.times_revived || 0,
            revivesPerformed: statsData.revives_performed || statsData.squad_revives || 0,
            maxExtractionStreak: statsData.max_extraction_streak || statsData.extraction_streak || statsData.highest_streak || 0,
            userId: effectiveMetaforgeId,
            discordId: userDiscordId,
            // Shiesty Features
            raidEfficiency: 0, // $/min
            demonStreak: 0,
            blackMarketValue: progression.stashValue * 0.85, // 15% market cut
            facilityLevels: statsData.facility_levels || statsData.hideout_levels || {},
            downedCount: statsData.downed_count || 0,
            extractionsUnderFire: statsData.extractions_hostile || 0,
            lootEfficiency: statsData.loot_efficiency || statsData.profit_per_minute || 0,
            weapons: weaponList,
            mapPerformance: statsData.map_stats || statsData.map_performance || []
          };
          
          // Shiesty Features calculations (real/live from raidHistory)
          if (raidHistory.length > 0) {
            // Sort recent first for streak
            const recentRaids = raidHistory.slice().reverse();
            let currentStreak = 0;
            let maxStreak = 0;
            let totalEfficiency = 0;
            let efficiencyCount = 0;

            recentRaids.forEach((raid: any) => {
              const outcome = raid.outcome?.toLowerCase() || raid.status?.toLowerCase() || '';
              const isSuccess = outcome.includes('extract') || outcome === 'success' || outcome === 'survived';
              const profit = raid.netValue || raid.rdValue || raid.loot_value || 0;
              const durationMin = (raid.duration || 15) / 60; // assume 15min default

              if (isSuccess) {
                currentStreak++;
                maxStreak = Math.max(maxStreak, currentStreak);
                if (durationMin > 0) {
                  totalEfficiency += profit / durationMin;
                  efficiencyCount++;
                }
              } else {
                currentStreak = 0;
              }
            });

            combatMetrics.raidEfficiency = efficiencyCount > 0 ? Math.round(totalEfficiency / efficiencyCount) : 0;
            combatMetrics.demonStreak = maxStreak;
          }

          if (statsData.session_history) {
            raidHistory = statsData.session_history;
          }
        }
      }
    } catch (e) {
      console.error("[ApiEngine] Error aggregation:", e);
    }

    return {
      profile,
      loadout,
      raidHistory,
      machineCodex,
      combatMetrics,
      progression
    };
  }

  static async getItemData(itemName: string) {
    try {
      // Find item in master list first
      const masterListRes = await axios.get('https://raw.githubusercontent.com/RaidTheory/arcraiders-data/main/items.json');
      const masterItems = masterListRes.data;
      const item = masterItems.find((i: any) => i.name.toLowerCase() === itemName.toLowerCase());
      
      const ardbData = await fetchArdb('items', item?.id || itemName.replace(/ /g, '_').toLowerCase());
      
      return {
        id: ardbData.id,
        name: ardbData.name,
        rarity: ardbData.rarity || "Common",
        marketValue: ardbData.value || 0,
        safeToRecycle: ardbData.safe_to_recycle ?? true,
        neededFor: ardbData.needed_for || [],
        icon: ardbData.icon
      };
    } catch (e) {
      console.error("[ApiEngine] Item data error:", e);
      return { rarity: "Common", marketValue: 0, safeToRecycle: true, neededFor: [] };
    }
  }

  static async syncInventoryToStore(discordId: string, foundItems: any[]) {
    // Determine which items are worth listing in the marketplace
    return foundItems.filter(i => 
      i.type === 'Blueprint' || 
      i.rarity === 'Legendary' || 
      i.rarity === 'Epic' ||
      i.count > 5
    );
  }
}