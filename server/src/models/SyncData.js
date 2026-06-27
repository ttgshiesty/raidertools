import mongoose from 'mongoose';

const SyncDataSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  source: {
    type: String,
    required: true,
  },
  xboxIp: {
    type: String,
  },
  payload: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  publicUuid: { type: String, index: true, sparse: true },
  inventoryMappings: [
    {
      publicUuid: String,
      itemId: String,
      slotIndex: Number,
      quantity: Number,
    },
  ],
  syncedAt: { type: Date, default: Date.now },
});

// Compound index for efficient latest sync lookups
SyncDataSchema.index({ userId: 1, source: 1, syncedAt: -1 });

export const SyncData = mongoose.model('SyncData', SyncDataSchema);
