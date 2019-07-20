const express = require("express")
const httpClient = require("../utils/httpClient")

const api = require("../utils/api")

const sensiboRouter = express.Router()
sensiboRouter
  .get("/pods", async (_, res) => {
    const qsObject = { fields: "acState,measurements,smartMode,room,id" }
    const activePods = await httpClient.get(
      api.allDevices,
      { params: qsObject }
    )

    return res.status(200).json(activePods)
  })

module.exports = sensiboRouter
