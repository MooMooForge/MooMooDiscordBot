const Command = require("../Command");
const Discord = require("discord.js")

class ExampleCommand extends Command {
    constructor(client) {
        super(client);
        this.name = "example";
        this.aliases = ["ex"];
        this.cooldown = 5000;
        this.userPermissions = ["SendMessages"];
        this.description = "This is an example command"
    }

    async execute(interaction, args) {
        await interaction.reply("This is an example command.");
    }
}

module.exports = ExampleCommand;
