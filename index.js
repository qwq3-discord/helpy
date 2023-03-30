const fs = require('node:fs')
const path = require('node:path')

const { Client, Events, GatewayIntentBits, Collection } = require('discord.js')
const { token } = require('./token.json')

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command)
    } else {
        console.log(`WARNING! The command at ${filePath} is missing a required "data" or "execute" property.`)
    }
}

const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const event = require(filePath)

    if(event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}

// client.on(Events.InteractionCreate, async (interaction) => {
//     if (!interaction.isChatInputCommand()) return

//     const command = interaction.client.commands.get(interaction.commandName)

//     if (!command) {
//         console.error(`Found no command matching ${interaction.commandName}`)
//         return
//     }

//     try {
//         await command.execute(interaction)
//     } catch (error) {
//         console.error(error)
//         if (interaction.replied || interaction.deferred) {
//             await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
//         } else {
//             await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
//         }
//     }

// })

client.login(token)