const express = require("express")

const api = require("../utils/api")
const db = require("../utils/db")

const sensiboRouter = express.Router()
sensiboRouter
  .get("/devices", async(req, res) => {
    const activeDevices = await api.getActiveDevices()

    return res.status(200).json(activeDevices)
  })
  .get("/devices/:id", async(req, response) => {
    const res = await db.getDeviceById(req.params.id)

    if(res.status === "error") return response.status(500).json(res)
    return response.status(200).json(res)
  })
  .get("/status/:id/:minutesToSubtract", async(req, response) => {
    const { id, minutesToSubtract } = req.params

    const amountOfMinutesBefore = new Date()
    amountOfMinutesBefore.setMinutes(amountOfMinutesBefore.getMinutes() - minutesToSubtract)
    const amountOfMinutesBeforeInSeconds = amountOfMinutesBefore / 1000

    const dbResponse = await db.getStatusByDeviceId(id, amountOfMinutesBeforeInSeconds)

    if(dbResponse.status === "error") return response.status(500).json(dbResponse)
    return response.status(200).json(dbResponse)
  })

module.exports = sensiboRouter
