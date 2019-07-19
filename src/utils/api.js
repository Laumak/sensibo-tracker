const env = require("../../env")
const utils = require("./utils")

const SENSIBO_API_URL = "https://home.sensibo.com/api/v2"

const routes = {
  allDevices: `${SENSIBO_API_URL}/users/me/pods`
}

const apiWithSensiboKey = Object.keys(routes)
  .reduce((prevObj, currentKey) => {
    return {
      ...prevObj,
      [currentKey]: utils.formatUrlWithQueryString(
        routes[currentKey],
        { apiKey: env.SENSIBO_TOKEN }
      )
    }
  }, {})

module.exports = apiWithSensiboKey
