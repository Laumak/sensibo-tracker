const express = require("express")
const apiRouter = express.Router()

const sensibo = require("./sensibo")

apiRouter.use("/sensibo", sensibo)

module.exports = apiRouter
