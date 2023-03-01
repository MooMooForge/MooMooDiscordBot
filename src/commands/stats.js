const Command = require("../Command");
const servers = require("../lib/data/servers");

const { EmbedBuilder } = require('discord.js');

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
    /**
     * 
     * @param {import("discord.js").Interaction} interaction 
     * @param {import("discord.js").Interaction.args} args 
     */
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

        if (!type && !region && !index) {
            let allServers = stats.normal.concat(stats.sandbox).concat(stats.dev)

            let playerCounts = {
                all: 0,
                sandbox: 0,
                normal: 0,
                dev: 0
            }

            allServers.forEach(server => {
                let games = server.games[0]

                let playerCount = games.playerCount;
                playerCounts.all += playerCount
            })

            stats.sandbox.forEach(server => {
                let games = server.games[0]

                let playerCount = games.playerCount;
                playerCounts.sandbox += playerCount
            })
            stats.normal.forEach(server => {
                let games = server.games[0]

                let playerCount = games.playerCount;
                playerCounts.normal += playerCount
            })
            stats.dev.forEach(server => {
                let games = server.games[0]

                let playerCount = games.playerCount;
                playerCounts.dev += playerCount
            })
            let totaldev = stats.dev.length;
            let totalsandbox = stats.sandbox.length
            let totalnormal = stats.normal.length
            let total = totaldev + totalsandbox + totalnormal;

            await interaction.editReply({
                embeds: [{
                    title: "Total Server Stats",
                    description: "[Need help, found a bug or want more features? Click here.](https://discord.gg/NMS3YR9Q5R)",
                    fields: [
                        {
                            name: "Overall MooMoo Stats",
                            value: "---"
                        },
                        {
                            name: "Server Stats",
                            value: `Total servers: ${total} \n \n sandbox.moomoo.io: **${totalsandbox} Servers** \n dev.moomoo.io: **${totaldev} Servers** \n moomoo.io: **${totalnormal} Servers**`
                        },
                        {
                            name: "Player Stats",
                            value: `Total players: ${playerCounts.all} \n Average Players per server: ${Math.round(playerCounts.all / total)} \n sandbox: **${playerCounts.sandbox} Players** \n normal: **${playerCounts.normal} Players** \n dev: **${playerCounts.dev} Players**`,
                        }
                    ]
                }]
            })
        } else if (type && !region && !index) {
            let stats = await serverstats(type)
            let playerCount = 0;

            stats.forEach(server => {
                let games = server.games[0]

                playerCount += games.playerCount
            })
            await interaction.editReply({
                embeds: [{
                    title: `${type} statistics`,
                    description: "[Need help, found a bug or want more features? Click here.](https://discord.gg/NMS3YR9Q5R)",
                    fields: [
                        {
                            name: "Total Players",
                            value: `${playerCount} Players`,
                            inline: true
                        },
                        {
                            name: "Total Servers",
                            value: `${stats.length} Servers`,
                            inline: true
                        },
                        {
                            name: "Average Players per server",
                            value: `${Math.round(playerCount / stats.length)} Players per server`,
                            inline: true
                        }
                    ]
                }]
            })
        } else if (type && region && !index) {
            let stats = await serverstats(type, region)
            let playerCount = 0;

            stats.forEach(server => {
                let games = server.games[0]

                playerCount += games.playerCount
            })

            let formattedServers = stats
                .map(server => {
                    let playerCount = server.games[0].playerCount;
                    return `${server.region.split("vultr:")[1]}:${server.index}:0 - ${playerCount}/50 players`;
                })
                .sort((a, b) => {
                    let playerCountA = parseInt(a.split(" - ")[1]);
                    let playerCountB = parseInt(b.split(" - ")[1]);
                    return playerCountB - playerCountA;
                })
                .join("\n");

            console.log(formattedServers);

            await interaction.editReply({
                embeds: [{
                    title: `Server stats for region \`${region}\` (${type})`,
                    description: "[Need help, found a bug or want more features? Click here.](https://discord.gg/NMS3YR9Q5R)",
                    fields: [
                        {
                            name: "Total Players",
                            value: `${playerCount} Players`,
                            inline: true
                        },
                        {
                            name: "Total Servers",
                            value: `${stats.length} Servers`,
                            inline: true
                        },
                        {
                            name: "Average Players per server",
                            value: `${Math.round(playerCount / stats.length)} Players`,
                            inline: true
                        },
                        {
                            name: "Server stats",
                            value: formattedServers
                        }
                    ]
                }]
            })
        } else if (type && region && index) {
            let server = await serverstats(type, region, index);

            let embed = {
                title: `Server Statistics (${type} - ${server.region.split("vultr:")[1]}:${server.index}:0)`,
                description: "[Need help, found a bug or want more features? Click here.](https://discord.gg/NMS3YR9Q5R)",
                fields: [
                    { name: 'Player Count', value: `${server.games[0].playerCount} / 50`, inline: true },
                    { name: 'Server Scheme', value: server.scheme, inline: true }
                ],
            };

            await interaction.editReply({
                embeds: [embed]
            })
        } else {
            await interaction.editReply({
                embeds: [{
                    title: "Error: Make sure you enter the command correctly.",
                    description: "[Need help, found a bug or want more features? Click here.](https://discord.gg/NMS3YR9Q5R)"
                }]
            })
        }


    }
}

module.exports = RegionInfoCommand;