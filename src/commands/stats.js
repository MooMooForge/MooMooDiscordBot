const Command = require("../Command");
const servers = require("../lib/data/servers");

const serverstats = require("moomoo-stats")

class StatsCommand extends Command {
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
        this.usage = {
            "title": `Stats command usage`,
            "description": `The stats command lets you request data about MooMoo.io servers.`,
            "fields": [
                {
                    "name": `Usage`,
                    "value": `You can use the slash command called \"stats\" to use the command.`,
                    "inline": true
                },
                {
                    "name": `Arguments`,
                    "value": `There are three arguments: \`type, region, index\``,
                    "inline": true
                },
                {
                    "name": `Providing no arguments`,
                    "value": `\nWhen you do not provide any argument, then the bot will return overall moomooio stats about all types.\n\nExample usage: \`/stats\``
                },
                {
                    "name": `Providing only a type`,
                    "value": `When you provide a type only, It will show overall statistics about the specified type. The types are set, so you can freely choose from any option given by the slash command menu.\n\nExample usage: \`/stats type:sandbox\``,
                },
                {
                    "name": `Providing a type and a region`,
                    "value": `When you provide a type and a region, the bot will return region statistics and a full list with available servers for that region (empty servers are filtered out)\n\nExample usage: \`/stats type:normal region:8\``,
                },
                {
                    "name": `Providing all arguments with index`,
                    "value": `The index is the number after the region in a server. For example, \`8:5:0\`, 5 would be the indexWhen you provide all arguments, the bot will simply return information about the given server.\n\nExample usage: \`/stats type:sandbox region:Frankfurt index:12\``,
                }
            ]
        }


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
                }).filter(server => {
                    let playerCount = parseInt(server.split(" - ")[1]);
                    return playerCount > 0;
                })
                .sort((a, b) => {
                    let playerCountA = parseInt(a.split(" - ")[1]);
                    let playerCountB = parseInt(b.split(" - ")[1]);
                    return playerCountB - playerCountA;
                })
                .join("\n");

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
            if (!server) {
                return await interaction.editReply("Server not found or API error.")
            }
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
                    title: "Error: Make sure you enter the command correctly. If you need help, try `/help`.",
                    description: "[Need help, found a bug or want more features? Click here.](https://discord.gg/NMS3YR9Q5R)"
                }]
            })
        }


    }
}

module.exports = StatsCommand;