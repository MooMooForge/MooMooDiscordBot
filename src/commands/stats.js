const Command = require("../Command");
const servers = require("../lib/data/servers");

const serverstats = require("moomoo-stats")

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
        await interaction.deferReply();

        let type;
        let region;
        let index;

        for (let i = 0; i < args.length; i++) {
            let command = args[i];

            switch (command.name) {
                case "type":
                    type = command.value;
                    break;
                case "region":
                    region = command.value
                    break;
                case "index":
                    index = command.value;
                    break
            }
        }
        let stats = await serverstats(type, region, index);

        console.log(stats)
        await interaction.editReply("This is an example command.");
    }
}

module.exports = RegionInfoCommand;
