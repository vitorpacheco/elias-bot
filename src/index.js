const { Client, Intents } = require('discord.js');

require('dotenv').config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_PRESENCES
  ]
});

client.once('ready', () => {
  client.user.setStatus('invisible');
  console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
  if (newPresence.guild !== undefined && newPresence.guild.id == process.env.GUILD_ID) {
    if (newPresence.user.username == process.env.BRASH_USERNAME && newPresence.user.discriminator == process.env.BRASH_DISCRIMINATOR) {
      if (newPresence.status != 'offline') {
        const channel = client.channels.cache.find(channel => channel.name == "geral");
        channel.send('tava onde elias?');
      }
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
