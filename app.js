const API = require("./core/api")
const login = require("./login.json")

async function start(){
    const api = new API()
    await api.init()
    await api.auth(login.login, login.password, login.cookie)
    
    // const profile = await api.getProfileInfo()
    const mainpage = await api.getMainPage()
    console.log("Go to "+mainpage.items[0].topics[0].head)
    const topic = await api.getTopic(mainpage.items[0].topics[0].url)

    console.log(JSON.stringify(topic))
}

module.exports = start