const axios = require("axios")
const cfg = require("../cfg")
const encodeUrl = require("../utils/encodeUrl")

 class Session{
    constructor(){
        this.session = axios.create({baseUrl: cfg.baseUrl})
        //this.ready = false
    }
    setCode(code) {
        this.ddos = code
        this.setCookie("REACTLABSPROTECTION", this.ddos, "Thu, 31-Dec-37 23:55:55 GMT", "/")
        //this.ready = true
        return this.session.defaults.headers.Cookie
    }
    setCookie(name, value, expires, path){
        const cookie = `${name}=${value}; expires=${expires}; path=${path}`
        this.session.defaults.headers.Cookie += cookie
        return this.session.defaults.headers.Cookie
    }
    get(url = cfg.baseUrl, params = {}, conf = {}){
        const response = this.session.get(url, params, conf)
        return response
    }
    post(url = cfg.baseUrl, params = {}, conf = {}){
        const resp = this.session.post(url, encodeUrl(params), conf)
        return resp
    }
}
const session = new Session()
module.exports = session