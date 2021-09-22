const axios = require("axios")
const cfg = require("../cfg")
const encodeUrl = require("../utils/encodeUrl")

 class Session{
    constructor(){
        this.session = axios.create({baseUrl: cfg.baseUrl})
        //this.ready = false
        this.cookies = []
    }
    get cookie(){
        return this.#makeCookieStr()
    }
    setCookie(name, value){
        this.cookies.push([name, value])
        return this.cookie
    }
    #makeCookieStr(){
        if(this.cookies.length === 0)
            return ""
        else{
            let cookiestr = ""
            this.cookies.forEach(e => {
                cookiestr += e[0]+"="+e[1]+";"
            })
            return cookiestr
        } 
    }
    get(url = cfg.baseUrl, conf = {}){
        if(conf.headers === undefined)
            conf.headers = {}
        conf.headers.Cookie = this.#makeCookieStr()
        const response = this.session.get(url, conf)
        return response
    }
    post(url = cfg.baseUrl, params = {}, conf = {}){
        if(conf.headers === undefined)
            conf.headers = {}
        conf.headers.Cookie = this.#makeCookieStr()
        const resp = this.session.post(url, encodeUrl(params), conf)
        return resp
    }
}
const session = new Session()
module.exports = session