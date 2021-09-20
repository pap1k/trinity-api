const api = require("./core/api")

async function start(){
    const r = await api.test()
    console.log(r.data)
}
start()