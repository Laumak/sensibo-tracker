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
        {{ device.measurements.temperature }}&nbspC
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
  mixins: [VueChartJs.mixins.reactiveProp],
  mounted () {
    this.renderChart(
      this.chartData,
      { responsive: true, maintainAspectRatio: false }
    )
  },
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
    selectedTimeframe: localStorage.getItem("selectedTimeframe") || "60",
  }),
  async mounted() {
    this.getUpstairsData()
    this.getDownstairsData()
    this.activeDevices = await this.getSensiboData()

    const tenSecondsInMilliseconds = 10000
    this.fetchingInterval = setInterval(async () => {
      this.activeDevices = await this.getSensiboData()
      this.getUpstairsData()
      this.getDownstairsData()
    }, tenSecondsInMilliseconds)
  },
  beforeDestroy() {
    clearInterval(this.fetchingInterval)
  },
  methods: {
    parseRelevantTimePoints: function(data) {
      return data.filter(p => {
        const minutes = new Date(p.date).getMinutes()
        const everyHour = minutes === 0
        const everyFiveMinutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]

        return this.selectedTimeframe === "60"
          ? everyFiveMinutes.includes(minutes)
          : everyHour
      })
    },
    getRelevantLabels: function(data) {
      return this.parseRelevantTimePoints(data).map(p => {
        return new Date(p.date).toTimeString().substr(0, 5)
      })
    },
    getUpstairsData: async function() {
      const res = await fetch(`/api/v0/sensibo/status/wUpzsX6u/${this.selectedTimeframe}`)
      const json = await res.json()
      const relevantTimePoints = this.parseRelevantTimePoints(json)

      const labels = this.getRelevantLabels(json)
      const data = [
        {
          label: "Lämpötila",
          backgroundColor: "rgba(155, 219, 255, 0.7)",
          data: relevantTimePoints.map(p => p.temperature)
        }, {
          label: "Kosteus",
          backgroundColor: "rgba(255, 175, 102, 0.7)",
          data: relevantTimePoints.map(p => p.humidity)
        }
      ]

      this.chartLabels = labels
      this.upstairsData = data
      this.upstairsDataLoaded = true
    },
    getDownstairsData: async function() {
      const res = await fetch(`/api/v0/sensibo/status/GGJKvCDD/${this.selectedTimeframe}`)
      const json = await res.json()
      const relevantTimePoints = this.parseRelevantTimePoints(json)

      const labels = this.getRelevantLabels(json)
      const data = [
        {
          label: "Lämpötila",
          backgroundColor: "rgba(155, 219, 255, 0.7)",
          data: relevantTimePoints.map(p => p.temperature),
        }, {
          label: "Kosteus",
          backgroundColor: "rgba(255, 175, 102, 0.7)",
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
    handleOnTimeframeSelect: function(e) {
      localStorage.setItem("selectedTimeframe", e.target.value)
      this.getUpstairsData()
      this.getDownstairsData()
    },
  },
})
