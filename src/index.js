require('dotenv').config()
const { Client, Intents } = require('discord.js')
const express = require('express')

const { validateNewPresence, checkUserIsElias } = require('./validations.js')

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


const checkPresence = (oldPresence, newPresence) => {
  if (!validateNewPresence(newPresence)) {
    return
  }

  if (checkUserIsElias(newPresence)) {
    askElias(client)
  }
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

client.on('presenceUpdate', (oldPresence, newPresence) => checkPresence(oldPresence, newPresence))

client.login(process.env.DISCORD_TOKEN)
