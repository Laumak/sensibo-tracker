const jwt = require("jsonwebtoken")

const env = require("../../env")
const tokenStates = {
  NO_TOKEN: "NO_TOKEN",
  SUCCESS: "SUCCESS",
  NO_USER: "NO_USER"
}

const generateToken = (user) => {
  if(!user || !Object.keys(user).length) {
    return tokenStates.NO_USER
  }

  return jwt.sign({ id: user.id, roles: user.roles }, env.SALT, { expiresIn: env.TOKEN_EXPIRY })
}

const verifyValidity = (token) => {
  if(!token) return tokenStates.NO_TOKEN

  try {
    jwt.verify(token, env.SALT)

    return tokenStates.SUCCESS
  } catch(error) {
    return error.message
  }
}

module.exports = { generateToken, verifyValidity, tokenStates }
