const express = require("express")

const httpClient = require("../utils/httpClient")
const api = require("../utils/api")
const db = require("../utils/db")

const arrayMove = (arr, fromIndex, toIndex) => {
  const element = arr.result[fromIndex];
  arr.result.splice(fromIndex, 1);
  arr.result.splice(toIndex, 0, element);

  return arr;
}

const sensiboRouter = express.Router()
sensiboRouter
  .get("/devices", async(req, res) => {
    const qsObject = { fields: "acState,measurements,smartMode,room,id" }
    const activeDevices = await httpClient.get(
      api.allDevices,
      { params: qsObject }
    )

    const reorderedActiveDevices = arrayMove(activeDevices, 0, 1);

    return res.status(200).json(reorderedActiveDevices)
  })
  .get("/devices/:id", async(req, response) => {
    const res = await db.getDeviceById(req.params.id)

    if(res.status === "error") return response.status(500).json(res)
    return response.status(200).json(res)
  })
  .get("/status/:id", async(req, response) => {
    const res = await db.getStatusByDeviceId(req.params.id)

    if(res.status === "error") return response.status(500).json(res)
    return response.status(200).json(res)
  })

module.exports = sensiboRouter
