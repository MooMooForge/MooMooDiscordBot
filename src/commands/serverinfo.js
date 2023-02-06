const Command = require("../Command");
const servers = require("../lib/data/servers");


class ExampleCommand extends Command {
    constructor(client) {
        super(client);
        this.name = "serverinfo";
        this.cooldown = 5000;
        this.userPermissions = ["SendMessages"];
        this.description = "This is an example command";
        this.options = [
            {
                name: "region",
                description: "Put in the region of the server you want to request information for.",
                type: 3,
                choices: servers.extractRegionsToChoices(),
                required: true
            },
            {
                name: "index",
                description: "Put in the index of the server you want to request information for.",
                type: 4,
                required: true
            },
            {
                name: "type",
                description: "Please put in the server type for the command.",
                type: 3,
                choices: servers.serverTypes,
                required: true
            }
        ]
    }

    async execute(interaction, args) {
        let region = null;
        let index = null;
        let type = null;

        args.forEach(function (option) {
            switch (option.name) {
                case "region":
                    region = option.value;
                    break;
                case "index": {
                    let variable = option.value

                    if (variable === 0 || (variable > 0 && variable < 50) || variable === 50) {
                        index = variable
                    } else {
                        return interaction.reply("There was an error capturing the command index. Please try again.")
                    }
                    break;
                }
                case "type":
                    type = option.value;
                    break;
                    
            }
        })
        await interaction.reply(`https://${type ? type + "." : ""}moomoo.io/?server=${region}:${index}:0`);
    }
}

module.exports = ExampleCommand;
