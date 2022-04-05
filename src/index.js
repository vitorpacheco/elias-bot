const { Client, Intents } = require('discord.js')
const express = require('express')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Onde está o Elias?')
})

app.listen(port, () => {
  console.log(`Onde está o Elias listening on port ${port}`)
})

const askElias = (client) => {
  const channel = client.channels.cache.find(channel => channel.name == "geral")
  channel.send('tava onde elias?')
}

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_PRESENCES
  ]
})

client.once('ready', () => {
  client.user.setStatus('invisible')
  console.log(`Ready! Logged in as ${client.user.tag}`)
})

client.on('presenceUpdate', (oldPresence, newPresence) => {
  if (newPresence.guild === undefined || newPresence.guild === null) {
    return
  }

  if (newPresence.guild.id != process.env.GUILD_ID) {
    return
  }

  if (newPresence.status == 'offline') {
    return
  }

  if (newPresence.user.username == process.env.BRASH_USERNAME && 
      newPresence.user.discriminator == process.env.BRASH_DISCRIMINATOR) {
    askElias(client)
  }
})

client.login(process.env.DISCORD_TOKEN)
