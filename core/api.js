const requests = require("./requests")
module.exports = {
    createSession: async () => {

    },
    test: async () => {
        return await requests.get()
    }
}