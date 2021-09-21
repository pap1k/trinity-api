const API = require("./core/api")
const fs = require('fs')
const login = require("./login.json")
const session = require("./core/session")

async function start(){
    const api = new API()
    await api.init()
    console.log(session.cookie)
    api.auth(login.login, login.password).then(resp => {
        fs.writeFile('uotlog.html', resp.data, function (err) {
            if (err) return console.log(err)
            console.log('Written')
        })
        console.log(resp)
    }, err => {
        console.log(err.response !== undefined ? err.response.status : err)
    })
}

module.exports = start