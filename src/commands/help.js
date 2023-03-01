const Command = require("../Command");

let cmds = []

class ExampleCommand extends Command {
    constructor(client) {
        super(client);
        this.name = "help";
        this.cooldown = 0;
        this.userPermissions = ["SendMessages"];
        this.description = "This command gives you help about other commands";
        this.example = true;
    }

    async execute(interaction, args) {
        let command = args[0].value;
        let targetCommand = cmds.find(item => item.name === command);

        await interaction.reply({
            embeds: [
                targetCommand.usage
            ]
        });
    }

    loadCommands(commands) {
        cmds = commands;
        let choices = [];
        cmds.forEach(command => {
            let choice = {
                name: command.name,
                value: command.name
            }
            
            choices.push(choice)
        })

        this.options = [{
            name: "command",
            description: "Choose the command you need help with.",
            type: 3,
            required: true,
            choices: choices
        }]
    }
}

module.exports = ExampleCommand;
