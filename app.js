const API = require("./core/api")

async function start(){
    const api = new API()
    await api.init()
    //const r = await api.test()
}
start()