// WORKS WITH SESSION DIRECTLY
const session = require("./session")
const getCode = require("./antiddos/getcode")
const cfg = require("../cfg")
const html = require("./htmltojs")

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

    async auth(uname, pwd, cookiedata = null) {
        if(!cookiedata){
            const get = await this.get()
            const csrf = get.data.match(/csrfKey: "(\w+)"\,/)
            const ref = get.data.match(/<input type="hidden" name="ref" value="(\w+)=">/)

            await this.get("https://gta-trinity.ru/forum/login")
            session.setCookie("ips4_hasJS", "true")
            await session.post(
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
                        if(f[1] == "ips4_member_id")
                            session.userId = f[2]
                        session.setCookie(f[1], f[2])
                    })
                })
        }
        else{
            for (const [key, value] of Object.entries(cookiedata)) {
                if(key == "ips4_member_id")
                    session.userId = value
                session.setCookie(key, value)
            }
        }
    }

    async test(){
        const r = session.get()
        return r
    }

    /**
     * @param {Number} profile Profile id
     */
    async getProfileInfo(profile = null){
        const черточки = '-------'
        let userId
        if(profile)
            userId = profile + черточки.slice(0, черточки.length - profile.toString().length)
        else
            userId = session.userId + черточки.slice(0, черточки.length - session.userId.toString().length)
        console.log(userId)
        const resp = await session.get(cfg.baseUrl+"/forum/profile/"+(profile ? profile : userId)+"/")
        return html.parseUser(resp.data)

    }

    async getMainPage(){
        const resp = await session.get()
        return html.parseMainPage(resp.data)
    }
}