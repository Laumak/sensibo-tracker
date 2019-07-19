const env = require("../../env")

const SENSIBO_API_URL = "https://home.sensibo.com/api/v2"

const routes = {
  allDevices: `${SENSIBO_API_URL}/users/me/pods`
}

const apiWithSensiboKey = Object.keys(routes)
  .reduce((prev, key) => {
    return {
      ...prev,
      [key]: `${routes[key]}?apiKey=${env.SENSIBO_TOKEN}`
    }
  }, {})

module.exports = apiWithSensiboKey
