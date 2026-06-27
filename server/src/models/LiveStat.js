import mongoose from 'mongoose';

const LiveStatSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  publicUuid: {
    type: String,
    required: true,
    index: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['kill', 'damage', 'extraction', 'death', 'loot'],
    index: true,
  },
  target: {
    type: String, // Normalized slug (e.g., 'wasp', 'venator-ii')
    index: true,
  },
  map: {
    type: String, // Normalized map slug (e.g., 'dam-battlegrounds')
    index: true,
  },
  value: {
    type: Number,
    default: 1,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

// Compound index for frequent stats queries
LiveStatSchema.index({ publicUuid: 1, type: 1, target: 1 });
LiveStatSchema.index({ userId: 1, type: 1, timestamp: -1 });

export const LiveStat = mongoose.model('LiveStat', LiveStatSchema);
