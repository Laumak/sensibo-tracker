const express = require("express")
const apiRouter = express.Router()

const authenticated = require("../middleware/authenticated")

const authRoutes  = require("./auth")
const usersRouter = require("./users")

// Public routes
apiRouter.use("/auth", authRoutes)

// Protected routes
apiRouter.use(authenticated)
apiRouter.use("/users", usersRouter)

module.exports = apiRouter
