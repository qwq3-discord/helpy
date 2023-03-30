const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check the bot latency'),
    async execute(interaction) {
        await interaction.reply("🏓 **Pong!**")
        await interaction.editReply(`🏓 **Pong!** (${interaction.client.ws.ping}ms)`)
    }
}