const { SlashCommandBuilder, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

// temp
const projects = require("../projects.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('projects')
        .setDescription('List all current projects'),
    async execute(interaction) {
        await interaction.reply({ content: "Loading...", ephemeral: true })
        await interaction.channel.send("success")

        for (const project in projects) {
            // console.log(projects[project].name)

            const notificationRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId(`notification_enable_${projects[project].name}`)
                .setStyle(ButtonStyle.Success)
                .setEmoji('🔔'),
                new ButtonBuilder()
                .setCustomId(`notification_disable_${projects[project].name}`)
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('🔕')
            )

            await interaction.channel.send({ content: `**${projects[project].name}**\n └ ${projects[project].link}`, components: [ notificationRow ]})
        }

        await interaction.editReply({ content: "Success!", ephemeral: true })
    }
}