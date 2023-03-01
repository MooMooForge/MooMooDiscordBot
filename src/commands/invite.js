const Command = require("../Command");

class InviteCommand extends Command {
    constructor(client) {
        super(client);
        this.name = "invite";
        this.cooldown = 0;
        this.userPermissions = ["SendMessages"];
        this.description = "gives you a link to invite the bot into your server";
        this.usage = {
            title: "Invite command usage",
            description: "just write /invite to get the link for the discord bot"
        }
    }

    async execute(interaction, args) {
        
        await interaction.reply({
            embeds: [{
                title: "Click here to invite the bot to your discord server!",
                url: "https://discord.com/api/oauth2/authorize?client_id=892560224781742091&permissions=285615381744&scope=applications.commands%20bot"
            }]
        });
    }
}

module.exports = InviteCommand;
