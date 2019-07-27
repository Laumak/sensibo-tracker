const { Client } = require("pg")

const pgClient = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
})

pgClient.connect()

module.exports = {
  getDeviceById: async (deviceId) => {
    try {
      const { rows } = await pgClient.query("SELECT * FROM public.devices WHERE id = $1", [deviceId])
      return rows
    } catch (err) {
      console.log(err.stack) // eslint-disable-line
      return err
    }
  },
  getStatusByDeviceId: async (deviceId) => {
    try {
      const { rows } = await pgClient.query(`
        SELECT id, device_id, date, temperature, humidity, status
        FROM public.statuses
        WHERE device_id = $1;
      `, [deviceId])
      return rows
    } catch (err) {
      console.log(err.stack) // eslint-disable-line
      return err
    }
  }
}
