const express = require("express")
const httpClient = require("../utils/httpClient")

const api = require("../utils/api")

const sensiboRouter = express.Router()
sensiboRouter
  .get("/devices", async (_, res) => {
    const qsObject = { fields: "acState,measurements,smartMode,room,id" }
    const activeDevices = await httpClient.get(
      api.allDevices,
      { params: qsObject }
    )

    return res.status(200).json(activeDevices)
  })

module.exports = sensiboRouter
