const session = require("./session")
const HTMLParser = require('node-html-parser')

module.exports = {
    parsePage : html => {
        const root = HTMLParser.parse(html)
        return root.querySelector("ol.ipsList_reset")
        return root
    }
}
