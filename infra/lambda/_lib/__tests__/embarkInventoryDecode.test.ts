import { describe, expect, it } from 'vitest';
import { decodeEmbarkInventory, type EmbarkRawInventoryItem } from '../embarkInventoryDecode';

function item(
  instanceId: string,
  gameAssetId: number,
  slots: string[] = [],
  amount = 1,
): EmbarkRawInventoryItem {
  return {
    instanceId,
    gameAssetId,
    slots,
    amount,
    durability: 75,
    maxDurability: 100,
  };
}

describe('Embark inventory source identity', () => {
  it('retains gameAssetId and instanceId on decoded stash rows', () => {
    const snapshot = decodeEmbarkInventory({ items: [
      item('inventory-root', 1173010504, ['stash-root']),
      item('stash-root', -2121050171, ['slot-1']),
      item('slot-1', 1440007245, ['item-1']),
      item('item-1', 923438116, [], 3),
    ] }, {
      syncedAt: '2026-06-18T12:00:00.000Z',
      cachedAt: 1,
      manifestId: 'manifest',
      rawSnapshotId: 'raw',
    });

    expect(snapshot.stash.items[0]).toMatchObject({
      itemId: 'adrenaline_shot',
      name: 'Adrenaline Shot',
      quantity: 3,
      durabilityPercent: 75,
      gameAssetId: 923438116,
      instanceId: 'item-1',
    });
  });
});
