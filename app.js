const API = require("./core/api")
const fs = require('fs')
const login = require("./login.json")
const session = require("./core/session")

async function start(){
    const api = new API()
    await api.init()
    await api.auth(login.login, login.password, login.cookie)
    const headers = await api.getPage()
    headers.forEach(header => {
        console.log(header.text.trim())
    })
}

module.exports = start