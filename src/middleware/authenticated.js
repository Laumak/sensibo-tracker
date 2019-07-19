const verifyValidity = require("../utils/jwt").verifyValidity

const authenticated = (req, res, next) => {
  const { token } = req.headers
  const authStatus = verifyValidity(token)

  if(authStatus === "SUCCESS") {
    return next()
  }

  return res.status(401).send({
    message: "Not authenticated",
    error: authStatus,
  })
}

module.exports = authenticated
