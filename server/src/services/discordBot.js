import {
  Client,
  EmbedBuilder,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
} from 'discord.js';
import { fetchStatsOverview } from './statsGateway.js';

const commands = [
  new SlashCommandBuilder().setName('stats').setDescription('View ARC Raiders stats'),
  new SlashCommandBuilder()
    .setName('raids')
    .setDescription('View recent ARC Raiders raids')
    .addIntegerOption((option) => option.setName('count').setDescription('Number of raids (1-10)').setMinValue(1).setMaxValue(10)),
  new SlashCommandBuilder().setName('help').setDescription('Show SHiESTY bot commands'),
];

function number(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function money(value) {
  return `$${number(value).toLocaleString()}`;
}

function duration(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(number(milliseconds) / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

async function registerCommands(token) {
  const clientId = process.env.DISCORD_CLIENT_ID?.trim();
  if (!clientId) throw new Error('DISCORD_CLIENT_ID is not set');
  const rest = new REST({ version: '10' }).setToken(token);
  const body = commands.map((command) => command.toJSON());
  const guildId = process.env.DISCORD_GUILD_ID?.trim();
  if (guildId) {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body });
    return;
  }
  await rest.put(Routes.applicationCommands(clientId), { body });
}

async function replyStats(interaction) {
  const overview = await fetchStatsOverview();
  const stats = overview.summary;
  const survivalRate = stats.totalRounds > 0 ? (stats.totalExtracted / stats.totalRounds) * 100 : 0;
  const embed = new EmbedBuilder()
    .setTitle('SHiESTY ARC Raiders Stats')
    .setColor(0x01abf4)
    .addFields(
      { name: 'Raids', value: number(stats.totalRounds).toLocaleString(), inline: true },
      { name: 'Extractions', value: number(stats.totalExtracted).toLocaleString(), inline: true },
      { name: 'Survival Rate', value: `${survivalRate.toFixed(1)}%`, inline: true },
      { name: 'ARC Kills', value: number(stats.totalArcKills).toLocaleString(), inline: true },
      { name: 'Player Kills', value: number(stats.totalPlayerKills).toLocaleString(), inline: true },
      { name: 'Damage', value: number(stats.totalDamage).toLocaleString(), inline: true },
      { name: 'Net Value', value: money(stats.totalNetValue), inline: true },
      { name: 'Containers', value: number(stats.totalContainersLooted).toLocaleString(), inline: true },
      { name: 'Time Topside', value: duration(stats.totalTimeMs), inline: true },
    )
    .setTimestamp(new Date(overview.fetchedAt));
  await interaction.editReply({ embeds: [embed] });
}

async function replyRaids(interaction) {
  const count = interaction.options.getInteger('count') ?? 5;
  const overview = await fetchStatsOverview();
  const raids = overview.recentRounds.slice(0, count);
  if (raids.length === 0) {
    await interaction.editReply('No ArcTracker rounds are available.');
    return;
  }
  const embed = new EmbedBuilder()
    .setTitle('Recent ARC Raiders Raids')
    .setColor(0xf1aa1c)
    .addFields(raids.map((raid, index) => ({
      name: `${raid.outcome === 'extracted' ? '✅' : '☠️'} Raid ${index + 1} — ${raid.mapName ?? raid.map ?? 'Unknown Map'}`,
      value: [
        `Result: ${raid.outcome ?? 'unknown'}`,
        `Net Value: ${money(raid.netValue)}`,
        `Kills: ${number(raid.arcKills) + number(raid.playerKills)}`,
        `Duration: ${duration(raid.durationMs)}`,
      ].join('\n'),
    })))
    .setTimestamp(new Date(overview.fetchedAt));
  await interaction.editReply({ embeds: [embed] });
}

export async function startDiscordBot() {
  const token = process.env.DISCORD_BOT_TOKEN?.trim();
  if (!token) {
    console.log('[Discord] DISCORD_BOT_TOKEN not set; bot disabled');
    return null;
  }

  await registerCommands(token);
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    try {
      if (interaction.commandName === 'help') {
        await interaction.reply({ content: '`/stats` — normalized totals\n`/raids` — paginated ArcTracker round history', ephemeral: true });
        return;
      }
      await interaction.deferReply({ ephemeral: true });
      if (interaction.commandName === 'stats') await replyStats(interaction);
      if (interaction.commandName === 'raids') await replyRaids(interaction);
    } catch (error) {
      const content = `Stats request failed: ${error.message}`;
      if (interaction.deferred || interaction.replied) await interaction.editReply(content).catch(() => {});
      else await interaction.reply({ content, ephemeral: true }).catch(() => {});
    }
  });
  client.once('clientReady', () => console.log(`[Discord] ${client.user.tag} connected`));
  await client.login(token);
  return client;
}
