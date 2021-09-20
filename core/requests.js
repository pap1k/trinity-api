const Session = require("./session")
const cfg = require("../cfg")

const session = Session()

module.exports = {
    get: async function(url = cfg.baseUrl, params = {}){
        const resp = await session.get(url, params)
        return resp
    }
}

export default session 