import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse as csvParse } from 'csv-parse/sync';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const DEFAULT_CSV_PATH =
  process.env.BLUEPRINTS_CSV_PATH || path.join(ROOT, 'shiestysource.csv');
const APPENDED_REPORTS_HEADER =
  'Blueprint,Map Condition,Behind Locked Door?,Container,Location on the map';

let cache = {
  path: '',
  mtimeMs: -1,
  rows: [],
  byKey: {},
};

export function normalizeBlueprintKey(value = '') {
  return String(value || '')
    .trim()
    .replace(/[_-]?blueprint$/i, '')
    .replace(/\s+blueprint$/i, '')
    .toLowerCase()
    .replace(/\bmagazine\b/g, 'mag')
    .replace(/[^a-z0-9]+/g, '');
}

export function blueprintSlugFromName(value = '') {
  return String(value || '')
    .trim()
    .replace(/\s+blueprint$/i, '')
    .replace(/\bmagazine\b/gi, 'mag')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function clean(value) {
  return String(value ?? '').trim();
}

function num(value) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function rowToIntel(row) {
  const name = clean(row.BlueprintName || row.Blueprint);
  const slug = blueprintSlugFromName(name);
  return {
    key: normalizeBlueprintKey(name),
    blueprintId: slug ? `${slug}_blueprint` : '',
    name,
    map: clean(row.Map),
    condition: clean(row.MapCondition || row['Map Condition'] || row.Condition),
    scavengable: clean(row.Scavengable),
    containers: clean(row.Containers),
    questReward: clean(row.QuestReward),
    trialsReward: clean(row.TrialsReward),
    containerType: clean(row.ContainerTypeAssumed),
    dropRatePerContainer: num(row.DropRateEstimate_PerContainer),
    avgRaids6: num(row.AvgRaidsEstimate_6Containers),
    avgRaids9: num(row.AvgRaidsEstimate_9Containers),
    notes: clean(row.Notes),
    locationNotes: clean(row.LocationNotes || row['Location on the map']),
    bestRoute: clean(row.BestKnownRoute),
    craftingMaterials: clean(row.CraftingMaterials),
    workshopLevel: clean(row.WorkshopLevel),
  };
}

export function loadBlueprintIntel(csvPath = DEFAULT_CSV_PATH) {
  if (!fs.existsSync(csvPath)) {
    cache = { path: csvPath, mtimeMs: -1, rows: [], byKey: {} };
    return cache;
  }

  const stat = fs.statSync(csvPath);
  if (cache.path === csvPath && cache.mtimeMs === stat.mtimeMs) return cache;

  let content = fs.readFileSync(csvPath, 'utf8');

  // Handle JavaScript wrapper format: window.SHIESTY_DATA = {...}
  if (content.trim().startsWith('window.SHIESTY_DATA')) {
    const prefix = 'window.SHIESTY_DATA';
    const startIdx = content.indexOf(prefix);
    if (startIdx !== -1) {
      let braceStart = content.indexOf('{', startIdx + prefix.length);
      if (braceStart !== -1) {
        // Extract JSON using brace counting
        let depth = 0;
        let inString = false;
        let escapeNext = false;
        let jsonEnd = braceStart;
        for (let i = braceStart; i < content.length; i++) {
          const ch = content[i];
          if (escapeNext) {
            escapeNext = false;
            continue;
          }
          if (ch === '\\') {
            escapeNext = true;
            continue;
          }
          if (ch === '"') {
            inString = !inString;
            continue;
          }
          if (inString) continue;
          if (ch === '{') {
            depth++;
          } else if (ch === '}') {
            depth--;
            if (depth === 0) {
              jsonEnd = i;
              break;
            }
          }
        }
        const jsonStr = content.slice(braceStart, jsonEnd + 1);
        const data = JSON.parse(jsonStr);
        // Convert the JSON data to CSV format for parsing
        if (data.rows && Array.isArray(data.rows)) {
          const headers = Object.keys(data.rows[0]).join(',');
          const csvRows = data.rows.map((row) =>
            Object.values(row)
              .map((val) =>
                typeof val === 'string' &&
                (val.includes(',') || val.includes('"'))
                  ? `"${val.replace(/"/g, '""')}"`
                  : val,
              )
              .join(','),
          );
          content = [headers, ...csvRows].join('\n');
        }
      }
    }
  }

  const reportsIndex = content.indexOf(`\n${APPENDED_REPORTS_HEADER}`);
  const intelContent =
    reportsIndex === -1 ? content : content.slice(0, reportsIndex);
  const parsed = csvParse(intelContent, {
    columns: true,
    skip_empty_lines: true,
  });
  const rows = parsed.map(rowToIntel).filter((row) => row.name && row.key);
  const byKey = {};

  rows.forEach((row) => {
    byKey[row.key] = row;
    if (row.blueprintId) byKey[normalizeBlueprintKey(row.blueprintId)] = row;
  });

  cache = { path: csvPath, mtimeMs: stat.mtimeMs, rows, byKey };
  return cache;
}

export function getBlueprintIntel(value) {
  if (!value) return null;
  const { byKey } = loadBlueprintIntel();
  return byKey[normalizeBlueprintKey(value)] || null;
}

export function getBlueprintIntelMap() {
  const { rows } = loadBlueprintIntel();
  return Object.fromEntries(rows.map((row) => [row.key, row]));
}

export function listingBlueprintKey(listing) {
  const value =
    listing?.itemStats?.blueprintId ||
    listing?.blueprintId ||
    listing?.itemId ||
    listing?.itemName;
  return normalizeBlueprintKey(value);
}

export function isBlueprintListing(listing) {
  return (
    Boolean(listing?.itemStats?.blueprintId || listing?.blueprintId) ||
    String(listing?.itemType || '').toLowerCase() === 'blueprint' ||
    String(listing?.itemName || '')
      .toLowerCase()
      .includes('blueprint')
  );
}

export function summarizeBlueprintListings(listings = []) {
  const grouped = {};
  listings.filter(isBlueprintListing).forEach((listing) => {
    const key = listingBlueprintKey(listing);
    if (!key) return;
    const row =
      grouped[key] ||
      (grouped[key] = {
        key,
        count: 0,
        lowestPrice: null,
        listings: [],
      });
    const price = Number(listing.price);
    row.count += 1;
    if (Number.isFinite(price)) {
      row.lowestPrice =
        row.lowestPrice == null ? price : Math.min(row.lowestPrice, price);
    }
    row.listings.push({
      _id: String(listing._id),
      itemId: listing.itemId,
      itemName: listing.itemName,
      itemrarity: listing.itemrarity,
      itemIconUrl: listing.itemIconUrl,
      price: listing.price,
      currency: listing.currency,
      quantity: listing.itemQuantity,
      sellerName: listing.sellerName,
      createdAt: listing.createdAt,
    });
  });
  return grouped;
}
