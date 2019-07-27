Vue.component("device-template", {
  name: "device-template",
  props: ["device"],
  computed: {
    parseDeviceStatusClass: function() {
      if(this.device.acState.on === false) return ""

      const statusMap = {
        cool: "device--cooling",
        heat: "device--heating",
      }

      return statusMap[this.device.acState.mode]
    }
  },
  template: `
    <div class="device" :class="parseDeviceStatusClass">
      <h2 class="device__name">
        {{ device.room.name }}
      </h2>

      <div class="device__temperature device__temperature--current">
        Tämänhetkinen
        <div>
          {{ device.measurements.temperature }}&nbspC
        </div>
      </div>
      <div class="device__temperature device__temperature--range">
        Raja-arvot
        <div>
          {{ device.smartMode.lowTemperatureThreshold }}&nbspC
          -
          {{ device.smartMode.highTemperatureThreshold }}&nbspC
        </div>
      </div>
    </div>
  `
})

Vue.component("LineChart", {
  name: "line-chart",
  extends: VueChartJs.Line,
  props: ["labels", "datasets"],
  mounted () {
    this.renderChart(
      { labels: this.labels, datasets: this.datasets },
      { responsive: true, maintainAspectRatio: false }
    )
  }
})

new Vue({
  el: "#vue-root",
  data: () => ({
    devicesLoading: false,
    activeDevices: [],
    fetchingInterval: undefined,

    upstairsDataLoaded: false,
    downstairsDataLoaded: false,
    chartLabels: [],
    upstairsData: [],
    downstairsData: [],
  }),
  async mounted() {
    this.getUpstairsData()
    this.getDownstairsData()
    this.activeDevices = await this.getSensiboData()

    this.fetchingInterval = setInterval(async () => {
      this.activeDevices = await this.getSensiboData()
    }, 10000)
  },
  beforeDestroy() {
    clearInterval(this.fetchingInterval)
  },
  methods: {
    parseRelevantTimePoints: function(data) {
      return data.filter(p => {
        const minutes = new Date(p.date).getMinutes()
        return minutes === 30 || minutes === 0
      })
    },
    getRelevantLabels: function(data) {
      return this.parseRelevantTimePoints(data).map(p => {
        return new Date(p.date).toTimeString().substr(0, 5)
      })
    },
    getUpstairsData: async function() {
      const res = await fetch("/api/v0/sensibo/status/wUpzsX6u")
      const json = await res.json()
      const relevantTimePoints = this.parseRelevantTimePoints(json)

      const labels = this.getRelevantLabels(json)
      const data = [
        {
          label: "Lämpötila",
          backgroundColor: "#9bdbff",
          data: relevantTimePoints.map(p => p.temperature)
        }, {
          label: "Kosteus",
          backgroundColor: "#ffaf66",
          data: relevantTimePoints.map(p => p.humidity)
        }
      ]

      this.chartLabels = labels
      this.upstairsData = data
      this.upstairsDataLoaded = true
    },
    getDownstairsData: async function() {
      const res = await fetch("/api/v0/sensibo/status/GGJKvCDD")
      const json = await res.json()
      const relevantTimePoints = this.parseRelevantTimePoints(json)

      const labels = this.getRelevantLabels(json)
      const data = [
        {
          label: "Lämpötila",
          backgroundColor: "#9bdbff",
          data: relevantTimePoints.map(p => p.temperature),
        }, {
          label: "Kosteus",
          backgroundColor: "#ffaf66",
          data: relevantTimePoints.map(p => p.humidity),
        }
      ]

      this.chartLabels = labels
      this.downstairsData = data
      this.downstairsDataLoaded = true
    },
    getSensiboData: async () => {
      this.devicesLoading = true

      const res = await fetch("/api/v0/sensibo/devices")
      const json = await res.json()

      this.devicesLoading = false

      return json.result
    },
  },
})
