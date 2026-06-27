/**
 * Compact format helpers for inventory items
 * Maps between compact (p,i,q,s,d,a,o) and full field names
 */

export function toCompact(item) {
  if (!item || typeof item !== 'object') return item;
  return {
    p: item.publicUuid,
    i: item.itemId,
    instanceId: item.instanceId,
    gameAssetId: item.gameAssetId,
    q: item.quantity,
    s: item.slotIndex,
    slotAssetId: item.slotAssetId,
    d: item.durabilityPercent,
    a: item.attachments?.map(toCompact),
    o: item.hasUserOverride || false,
  };
}

export function fromCompact(compact) {
  if (!compact || typeof compact !== 'object') return compact;
  return {
    instanceId: compact.instanceId,
    publicUuid: compact.p,
    gameAssetId: compact.gameAssetId,
    itemId: compact.i,
    quantity: compact.q,
    slotIndex: compact.s,
    slotAssetId: compact.slotAssetId,
    durabilityPercent: compact.d,
    attachments: compact.a?.map(fromCompact),
    hasUserOverride: compact.o,
  };
}

export function extractMappings(items) {
  const mappings = [];
  for (const item of items || []) {
    if (item.p && item.i) {
      mappings.push({
        publicUuid: String(item.p).trim().toLowerCase(),
        itemId: item.i,
        slug: String(item.i).trim().toLowerCase().replace(/_/g, '-'),
        slotIndex: item.s ?? item.slotIndex ?? item.slot ?? null,
        quantity: Number(item.q ?? item.quantity ?? item.amount ?? 1),
        gameAssetId:
          item.gameAssetId ?? item.game_asset_id ?? item.assetId ?? null,
        status: item.i === '__empty_slot__' ? 'blank' : 'resolved',
        isBlankMapping: item.i === '__empty_slot__',
      });
    } else if (item.publicUuid && item.itemId) {
      mappings.push({
        publicUuid: String(item.publicUuid).trim().toLowerCase(),
        itemId: item.itemId,
        slug:
          item.slug ||
          String(item.itemId).trim().toLowerCase().replace(/_/g, '-'),
        slotIndex: item.slotIndex ?? item.slot ?? item.s ?? null,
        quantity: Number(item.quantity ?? item.q ?? item.amount ?? 1),
        gameAssetId:
          item.gameAssetId ?? item.game_asset_id ?? item.assetId ?? null,
        status: item.itemId === '__empty_slot__' ? 'blank' : 'resolved',
        isBlankMapping: item.itemId === '__empty_slot__',
      });
    }
    if (item.a || item.attachments) {
      mappings.push(...extractMappings(item.a || item.attachments));
    }
  }
  return mappings;
}
