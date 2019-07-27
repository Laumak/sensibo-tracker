const CronJob = require("cron").CronJob

const db = require("../utils/db")
const api = require("../utils/api")

const setupCronJobs = () => {
  // https://crontab.guru/every-5-minutes
  new CronJob("*/5 * * * *", async () => {
    console.log("CRON: Fetching device statuses & saving to DB...") // eslint-disable-line

    const allDevices = await api.getActiveDevices()
    db.saveDeviceStatusData(allDevices.result)

    console.log("CRON: Data saved.") // eslint-disable-line
  }, null, true, "Europe/Helsinki")
}

module.exports = setupCronJobs
