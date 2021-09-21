// WORKS WITH SESSION DIRECTLY
const session = require("./session")
const getCode = require("./antiddos/getcode")
const cfg = require("../cfg")

module.exports = class API{
    constructor(){
        
    }
    async init(){
        const resp = await session.get()
        const found = [...resp.data.matchAll(/"(\w+)"/g)]
        const words = []
        for(let e of found){
            words.push(e[1])
        }
        return session.setCookie("REACTLABSPROTECTION", getCode(words), "Thu, 31-Dec-37 23:55:55 GMT", "/")
    }
    async get(){
        return session.get()
    }
    async auth(uname, pwd) {
        const get = await this.get()

        const csrf = get.data.match(/csrfKey: "(\w+)"\,/)
        const ref = get.data.match(/<input type="hidden" name="ref" value="(\w+)=">/)

        await this.get("https://gta-trinity.ru/forum/login")

        const resp = session.post(
            cfg.baseUrl+"/forum/login",
            {
                auth: uname,
                password: pwd,
                remember_me: 1,
                csrfKey: csrf[1],
                _processLogin: "usernamepassword",
                ref: ref[1]+"="
            },
            {
                headers: {
                    "Referer": "https://gta-trinity.ru/forum/?_fromLogin=1&_fromLogout=1",
                }
            })
        return resp
    }
    async test(){
        const r = session.get()
        return r
    }
}