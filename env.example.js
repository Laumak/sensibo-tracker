// Copy this file to the project's root folder as "env.js"

module.exports = {
  // Used for hashing the generated JWT token
  SALT: "something-secret",
  // JWT token expiry: https://github.com/zeit/ms
  TOKEN_EXPIRY: "5m",
  // Sensibo API token: https://home.sensibo.com/me/api
  SENSIBO_TOKEN: "",
}
