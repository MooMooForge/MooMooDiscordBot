require("dotenv").config();

const { REST, Routes } = require("discord.js");

async function restApiCall(TOKEN, commands) {
    const rest = new REST({ version: "10" }).setToken(TOKEN);
    try {
        console.log("Started refreshing application (/) commands.");
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
}

module.exports = restApiCall;