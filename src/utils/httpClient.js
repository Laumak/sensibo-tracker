const fetch = require("node-fetch")

async function get(url, params) {
  let json = {}

  try {
    const resp = await fetch(url, params)
    json = await resp.json()
  } catch(e) {
    console.log(e) // eslint-disable-line
  }

  return json
}

module.exports = {
  get,
}
