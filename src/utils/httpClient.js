const fetch = require("node-fetch")

const utils = require("./utils")

async function get(url, { params = undefined }) {
  let json = {}

  try {
    const formattedUrl = utils.formatUrlWithQueryString(url, params)
    const resp = await fetch(formattedUrl)
    json = await resp.json()
  } catch(e) {
    console.log(e) // eslint-disable-line
  }

  return json
}

module.exports = {
  get,
}
