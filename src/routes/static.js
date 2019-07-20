const path = require("path")
const express = require("express")

const staticRouter = express.Router()

staticRouter
  .get("/", (_, res) => {
    return res.sendFile(path.resolve("src/static/views/dashboard.html"))
  })

module.exports = staticRouter
