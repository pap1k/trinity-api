const API = require("./core/api")
const fs = require('fs')

async function start(){
    const api = new API()
    await api.init()
    api.auth("!", "ikp01kqdr6").then(resp => {
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