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
  .get("/status/:id", async(req, response) => {
    const res = await db.getStatusByDeviceId(req.params.id)

module.exports = sensiboRouter
