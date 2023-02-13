const Command = require("../Command");

const TokenGenerator = require("moomoo-recaptcha-token-generator");

class TokenGeneratorCommand extends Command {
    constructor(client) {
        super(client);
        this.name = "generatetoken";
        this.cooldown = 30000;
        this.userPermissions = ["SendMessages"];
        this.description = "Generates a recaptcha token";
        this.options = []
    }

    async execute(interaction, args) {
        await interaction.deferReply();
        const token = await TokenGenerator.generateToken();
        await interaction.editReply("```" + token + "```");
    }
}

module.exports = TokenGeneratorCommand;
