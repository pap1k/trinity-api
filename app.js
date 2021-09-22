const API = require("./core/api")
const login = require("./login.json")

async function start(){
    const api = new API()
    await api.init()
    await api.auth(login.login, login.password, login.cookie)
    
    const headers = await api.getPage()
    headers.querySelectorAll("h4").forEach(header => {
        console.log(header.text.trim())
    })
}

module.exports = start