const axios = require("axios")


/**
 * 
 * @param {String} type 
 * @param {Number} region 
 * @param {Number} index 
 * @returns {Promise}
 */
async function getServerInfo(type, region, index) {
    console.log(type, region, index)
    console.log(`https://${type}moomoo.io/serverData`)
    return new Promise((resolve, reject) => {
        axios.get(`https://${type}moomoo.io/serverData`).then(res => {
            let data = res.data;
            let servers = data.servers;
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
                console.log("Server not found")
                resolve(null)
            } else {
                resolve(targetServer)
            }
        })
    })
}

module.exports = getServerInfo;