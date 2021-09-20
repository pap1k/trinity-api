const axios = require("axios")
const cfg = require("../cfg")

module.exports = class Session{
    constructor(){
        this.session = axios.create({baseUrl: cfg.baseUrl})
        this.ready = false
    }
    setCode(code) {
        this.ddos = code
        const cookie = "REACTLABSPROTECTION="+this.ddos+"; expires=Thu, 31-Dec-37 23:55:55 GMT; path=/"
        this.session.defaults.headers.Cookie = cookie
        this.ready = true
        return this.session.defaults.headers.Cookie
    }
    get(url = cfg.baseUrl, params = {}){
        const response = this.session.get(url, params)
        return response
    }
}
