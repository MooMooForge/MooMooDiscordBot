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
                "name": "example",
                "description": "ExampleDescription",
                "type": 3,
                "required": true,
                "choices": [
                    {
                        "name": "optionone",
                        "value": "optionvalue"
                    },
                    {
                        "name": "optiontwo",
                        "value": "optionvaluetwo"
                    }
                ]
            }
        ]
    }

    async execute(interaction, args) {
        console.log(args)
        await interaction.reply("This is an example command.");
    }
}

module.exports = RegionInfoCommand;
