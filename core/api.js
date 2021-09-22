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
        session.setCookie("REACTLABSPROTECTION", getCode(words))
        const r = await session.get()
        return session.setCookie("ips4_IPSSessionFront", r.headers['set-cookie'][0].match(/ips4_IPSSessionFront=(\w+);/)[1])
    }

    async get(){
        return session.get()
    }

    async auth(uname, pwd) {
        const get = await this.get()
        const csrf = get.data.match(/csrfKey: "(\w+)"\,/)
        const ref = get.data.match(/<input type="hidden" name="ref" value="(\w+)=">/)

        await this.get("https://gta-trinity.ru/forum/login")
        session.setCookie("ips4_hasJS", "true")
        session.post(
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
                maxRedirects: 0,
            }).
            then(non301 => {}, ok => {
                console.log()
                ok.response.headers['set-cookie'].forEach(cookie => {
                    let f = cookie.match(/(\w+)=(\w+);/)
                    session.setCookie(f[1], f[2])
                })
            })
    }

    async test(){
        const r = session.get()
        return r
    }
}