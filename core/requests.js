const session = require("./session")
const cfg = require("../cfg")

module.exports = {
    get: async function(url = cfg.baseUrl, params = {}){
        const resp = await session.get(url, params)
        return resp
    }
} 