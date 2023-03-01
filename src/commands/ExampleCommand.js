const Command = require("../Command");

class ExampleCommand extends Command {
    constructor(client) {
        super(client);
        this.name = "example";
        this.cooldown = 5000;
        this.userPermissions = ["SendMessages"];
        this.description = "This is an example command";
        this.example = true;
        // this.options = [
        //     {
        //         name: "first option",
        //         description: "first argument",
        //         type: 3,
        //         choices: [{
        //             // ...
        //         }],
        //         required: false
        //     },
        //     {
        //         name: "second option",
        //         description: "second argument",
        //         type: 3,
        //         choices: [{
        //             // ...
        //         }],
        //         required: false
        //     }
        // ]
    }

    async execute(interaction, args) {
        console.log(args)
        await interaction.reply("This is an example command.");
    }
}

module.exports = ExampleCommand;
