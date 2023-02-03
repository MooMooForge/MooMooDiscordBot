const Command = require("../Command");

class ExampleCommand extends Command {
    constructor(client) {
        super(client);
        this.name = "example";
        this.aliases = ["ex"];
        this.cooldown = 5000;
        this.userPermissions = ["SendMessages"];
        this.description = "This is an example command";
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

module.exports = ExampleCommand;
