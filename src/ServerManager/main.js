const axios = require("axios")

class ServerManager {
    constructor() {
        this.initialize()
        this.validServers = new Array();
    }

    initialize() {
        // ...
    }

    static async fetchServerData(type) {
        return new Promise(async(resolve) => {
            let res = await axios.get(`https://${type}moomoo.io/serverData`);
            let data = res.data;

            if(data.servers) {
                resolve(data.servers);
            } else {
                resolve(null)
            }
        })
    }
}

module.exports = ServerManager