const express = require("express")
const httpClient = require("../utils/httpClient")

const api = require("../utils/api")

const sensiboRouter = express.Router()
sensiboRouter
  .get("/pods", async (_, res) => {
    const activePods = await httpClient.get(api.allDevices)

    return res.status(200).json(activePods)
  })

module.exports = sensiboRouter
