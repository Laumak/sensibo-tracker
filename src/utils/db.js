const { Client } = require("pg")

const pgClient = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
})

pgClient.connect()

module.exports = {
  getDeviceById: async (deviceId) => {
    try {
      const { rows } = await pgClient.query(`
        SELECT * FROM public.devices WHERE id = $1
      `, [deviceId])
      return rows
    } catch (err) {
      console.log(err.stack) // eslint-disable-line
      return err
    }
  },
  getStatusByDeviceId: async (deviceId, amountOfMinutesBeforeInSeconds) => {
    try {
      const { rows } = await pgClient.query(`
        WITH t AS (
          SELECT id, device_id, date, temperature, humidity, status
          FROM public.statuses
          WHERE device_id = $1
            AND date >= to_timestamp($2)
          ORDER BY date DESC
          LIMIT 500
        )

        SELECT * FROM t ORDER BY date ASC;
      `, [deviceId, amountOfMinutesBeforeInSeconds])

      return rows
    } catch (err) {
      return err
    }
  },
  saveDeviceStatusData: async (allDevices) => {
    const nowInSeconds = Date.now() / 1000

    try {
      allDevices.forEach(async ({ id, acState, measurements }) => {
        const deviceStatus = acState.on ? "on" : "off"
        const { rows } = await pgClient.query(`
          INSERT
            INTO public.statuses(device_id, date, status, temperature, humidity)
            VALUES($1, to_timestamp($2), $3, $4, $5)
            RETURNING *
        `, [id, nowInSeconds, deviceStatus, measurements.temperature, measurements.humidity])

        return rows
      })

      return { status: "ok", data: { message: "Device data successully saved to DB." } }
    } catch (err) {
      return err
    }
  },
}
