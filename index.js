const { Client, Events, GatewayIntentBits } = require('discord.js')
const { token } = require('./config.json')

const client = new Client({ intents: [ GatewayIntentBits.Guilds ]});

client.once(Events.ClientReady, () => {
    console.log(`Ready and logged in as ${client.user.tag}`)
})

client.login(token)