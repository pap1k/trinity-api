const axios = require("axios")
const cfg = require("../cfg")

session = axios.create({baseUrl: cfg.baseUrl})
module.exports = session


