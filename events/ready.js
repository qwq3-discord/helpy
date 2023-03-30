const { Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log("Ready and logged in as " + client.user.tag)
    }
}