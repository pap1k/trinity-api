// WORKS WITH SESSION DIRECTLY
const Session = require("./session")
const session = new Session()
const getCode = require("./antiddos/getcode")

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
        return session.setCode(getCode(words))
    }
    async test(){
        const r = await session.get()
        return r
    }
}