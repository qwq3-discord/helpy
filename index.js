const fs = require('node:fs')
const path = require('node:path')

const { Client, Events, GatewayIntentBits, Collection } = require('discord.js')
const { token } = require('./token.json')

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()

require('./modules/commandRegistry').execute(client)
require('./modules/eventRegistry').execute(client)

client.login(token)