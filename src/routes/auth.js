const express = require("express")

const generateToken = require("../utils/jwt").generateToken

const usersRouter = express.Router()

usersRouter.route("/request")
  .post((req, res) => {
    const user = { id: 1, roles: [ "admin" ] }
    const jwtToken = generateToken(user)

    return res.status(200).json({ token: jwtToken })
  })

module.exports = usersRouter
