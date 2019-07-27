const env = require("../../env")
const utils = require("./utils")
const httpClient = require("./httpClient")

const SENSIBO_API_URL = "https://home.sensibo.com/api/v2"

const apiUrls = {
  allDevices: `${SENSIBO_API_URL}/users/me/pods`
}

const apiUrlsWithApiKey = Object.keys(apiUrls)
  .reduce((prevObj, currentKey) => {
    return {
      ...prevObj,
      [currentKey]: utils.formatUrlWithQueryString(
        apiUrls[currentKey],
        { apiKey: env.SENSIBO_TOKEN }
      )
    }
  }, {})

const getActiveDevices = async () => {
  const qsObject = { fields: "acState,measurements,smartMode,room,id" }
  const activeDevices = await httpClient.get(
    apiUrlsWithApiKey.allDevices,
    { params: qsObject }
  )
  const reorderedActiveDevices = utils.arrayMove(activeDevices, 0, 1);

  return reorderedActiveDevices
}

module.exports = {
  getActiveDevices,
}
