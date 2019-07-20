Vue.component('device-template', {
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
        Current: {{ device.measurements.temperature }}&nbspC
      </div>
      <div class="device__temperature device__temperature--range">
        Temp range:
        <div>
          {{ device.smartMode.lowTemperatureThreshold }}&nbspC
          -
          {{ device.smartMode.highTemperatureThreshold }}&nbspC
        </div>
      </div>
    </div>
  `
})

new Vue({
  el: "#vue-root",
  data() {
    return {
      devicesLoading: false,
      activeDevices: [],
      fetchingInterval: undefined,
    }
  },
  async mounted() {
    this.activeDevices = await this.getSensiboData()

    this.fetchingInterval = setInterval(async () => {
      this.activeDevices = await this.getSensiboData()
    }, 10000)
  },
  beforeDestroy() {
    clearInterval(this.fetchingInterval)
  },
  methods: {
    getSensiboData: async () => {
      this.devicesLoading = true

      const res = await fetch("/api/v0/sensibo/devices")
      const json = await res.json()

      this.devicesLoading = false

      return json.result
    },
  },
})
