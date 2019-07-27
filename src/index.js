const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")

const setupCronJobs = require("./utils/cron")

const apiRouter = require("./routes/api")
const staticRouter = require("./routes/static")

const app = express()
const port = process.env.PORT || 4000

app.listen(port, () => {
  const message = `App listening on port ${port}`
  console.log(message) // eslint-disable-line no-console
  console.log("") // eslint-disable-line no-console
})

// HTTP request logging
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

app.use(bodyParser.json())
app.use("/static", express.static(path.resolve(__dirname, "static")))

app.use("/api/v0/", apiRouter)
app.use("/", staticRouter)

setupCronJobs()
