import dotenv from 'dotenv';
import path from 'node:path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import statsRoutes from './routes/stats.js';
import playerRoutes from './routes/player.js';
import arctrackerV2Routes from './routes/arctrackerV2.js';
import { startDiscordBot } from './services/discordBot.js';

dotenv.config();
if (!process.env.ARC_APP_KEY || !process.env.ARC_USER_KEY) {
  dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
}

const app = express();
const port = Number(process.env.PORT || 4000);
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin.startsWith('chrome-extension://')) return callback(null, true);
    return callback(new Error('Origin not allowed'));
  },
  credentials: false,
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '1mb' }));

app.use('/api/stats', statsRoutes);
app.use('/api/player', playerRoutes);
app.use('/api/v2/user', arctrackerV2Routes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'raider-tools-stats', time: new Date().toISOString() });
});

app.use((error, _req, res, _next) => {
  console.error('[Server] Request failed', error.message);
  res.status(500).json({ error: 'Request failed' });
});

app.listen(port, () => {
  console.log(`[Server] Stats server listening on port ${port}`);
});

startDiscordBot().catch((error) => {
  console.error('[Discord] Bot failed to start', error.message);
});
