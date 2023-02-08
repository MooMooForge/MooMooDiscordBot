const axios = require("axios")
const ServerManager = require("../ServerManager/main")

/**
 * 
 * @param {String} type 
 * @param {Number} region 
 * @param {Number} index 
 * @returns {Promise}
 */
async function getServerInfo(type, region, index) {
    let servers = await ServerManager.fetchServerData(type);
    let targetServer = null;
    servers.forEach(server => {
        let ip = server.ip;
        let reg = server.region.split("vultr:")[1];
        let ind = server.index;

        if (reg == region && ind == index) {
            targetServer = server;
        }
    })
    if (!targetServer) {
        return null;
    } else {
        return targetServer;
    }
}

module.exports = getServerInfo;