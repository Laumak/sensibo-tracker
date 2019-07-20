const express = require("express")
const httpClient = require("../utils/httpClient")

const api = require("../utils/api")

const arrayMove = (arr, fromIndex, toIndex) => {
  const element = arr.result[fromIndex];
  arr.result.splice(fromIndex, 1);
  arr.result.splice(toIndex, 0, element);

  return arr;
}

const sensiboRouter = express.Router()
sensiboRouter
  .get("/devices", async (_, res) => {
    const qsObject = { fields: "acState,measurements,smartMode,room,id" }
    const activeDevices = await httpClient.get(
      api.allDevices,
      { params: qsObject }
    )

    const reOrderedActiveDevices = arrayMove(activeDevices, 0, 1);

    return res.status(200).json(reOrderedActiveDevices)
  })

module.exports = sensiboRouter
