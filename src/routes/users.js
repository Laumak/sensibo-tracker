const express = require("express")
const usersRouter = express.Router()

const users = [
  { id: 1, email: "john@email.com", name: "John Doe" },
  { id: 2, email: "jane@email.com", name: "Jane Doe" },
]

const findById = id => users.find(user => user.id == id)

usersRouter.route("/")
  .get((req, res) => res.status(200).json({ users }))

usersRouter.route("/:id")
  .get((req, res) => {
    const userId = req.params.id

    return res.status(200).json({ user: findById(userId) })
  })

module.exports = usersRouter
