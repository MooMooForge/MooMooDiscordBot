const Command = require("../Command");
const servers = require("../lib/data/servers");
const getServerInfo = require("../lib/getServerInfo");

class ServerInfoCommand extends Command {
    constructor(client) {
        super(client);
        this.name = "serverinfo";
        this.cooldown = 5000;
        this.userPermissions = ["SendMessages"];
        this.description = "Requests information from a server";
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

    /**
     * 
     * @param {import("discord.js").Interaction} interaction 
     * @param {Array} args 
     */

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
                    index = option.value;
                    break;
                }
                case "type":
                    type = option.value;
                    type = type ? type + "." : ""
                    break;

            }
        })
        await interaction.deferReply();
        let serverinfo = await getServerInfo(type, region, index);
        if (serverinfo) {
            await interaction.editReply({
                embeds: [
                    {
                        color: parseInt("0x" + "#0099ff".slice(1)),
                        title: `Server ${region}:${index}:0 (${type ? type.replace(".", "") : "normal"})`,
                        description: `[Link](https://${type}moomoo.io/?server=${region}:${index}:0)`,
                        fields: [
                            { name: "IP", value: serverinfo.ip, inline: false },
                            { name: "Player Count", value: `${serverinfo.games[0].playerCount}/${50}`, inline: false }
                        ]
                    }
                ]
            });

        } else {
            await interaction.editReply("Server not found")
        }
    }
}

module.exports = ServerInfoCommand;
