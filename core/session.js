const req = require("./requests")
const axios = require("axios")
const cfg = require("../cfg")

session = axios.create({baseUrl: cfg.baseUrl})

