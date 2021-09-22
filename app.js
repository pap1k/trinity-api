const API = require("./core/api")
const fs = require('fs')
const login = require("./login.json")
const session = require("./core/session")

async function start(){
    const api = new API()
    await api.init()
    api.auth(login.login, login.password)
    
}

module.exports = start