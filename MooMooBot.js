require("dotenv").config();

const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [Discord.IntentsBitField.Flags.Guilds, Discord.IntentsBitField.Flags.GuildMessages, Discord.IntentsBitField.Flags.GuildMembers]
});
const fs = require("fs");

const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));
const commands = [];

for (const file of commandFiles) {
  const CommandClass = require(`./src/commands/${file}`);
  const command = new CommandClass(client);
  commands.push(command);
}

require('./src/restApiCall')(process.env.BOT_TOKEN, commands)

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.find(c => c.name === interaction.commandName || c.aliases.includes(interaction.commandName));
    if (!command) return;

    if (command.userPermissions && interaction.member.permissions.has(...command.userPermissions)) {
        let permissions = [...command.userPermissions]
        let saveperms = []
        interaction.member.permissions.toArray().forEach(permission => {
            if(permissions.includes(permission)) {
                saveperms.push(permission)
            }
        })
        let hasPermission = permissions.toString() == saveperms.toString()
        if(!hasPermission) {
            interaction.reply("You dont have permissions to execute this command.");
            return;
        }
    }
    if (command.cooldown) {
        const timeSinceLastUse = Date.now() - (command.lastUse || 0);
        if (timeSinceLastUse < command.cooldown) {
            const timeLeft = (command.cooldown - timeSinceLastUse) / 1000;
            await interaction.reply(`Please wait ${timeLeft.toFixed(1)} seconds before using this command again.`);
            return;
        }
    }

    command.lastUse = Date.now();
    try {
        await command.execute(interaction, interaction.options.data);
    } catch (error) {
        console.error(error);
        await interaction.reply("An error occurred while executing the command.");
    }
});

client.on("ready", function() {
    console.log("ready")
})

client.login(process.env.BOT_TOKEN);
