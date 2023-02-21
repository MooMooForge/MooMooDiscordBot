const Command = require("../Command");
const servers = require("../lib/data/servers");

class RegionInfoCommand extends Command {
    constructor(client) {
        super(client);
        this.name = "stats";
        this.cooldown = 5000;
        this.userPermissions = ["SendMessages"];
        this.description = "Requests information from MooMoo.io";
        this.options = [
            {
                name: "type",
                description: "Please put in the server type for the command.",
                type: 3,
                choices: servers.serverTypes,
                required: false
            },
            {
                name: "region",
                description: "Put in the region of the server you want to request information for.",
                type: 3,
                required: false,
                choices: servers.extractRegionsToChoices()
            },
            {
                name: "index",
                description: "Put in the index of the server you want to request information for.",
                type: 4,
                required: false
            }
        ]
    }

    async execute(interaction, args) {
        console.log(args)
        await interaction.reply("This is an example command.");
    }
}

module.exports = RegionInfoCommand;
