Vue.component('pod-template', {
  name: "pod-template",
  props: ["pod"],
  computed: {
    parsePodStatusClass: function() {
      if(this.pod.acState.on === false) return ""

      const statusMap = {
        cool: "pod--cooling",
        heat: "pod--heating",
      }

      return statusMap[this.pod.acState.mode]
    }
  },
  template: `
    <div class="pod" :class="parsePodStatusClass">
      <h2 class="pod__name">
        {{ pod.room.name }}
      </h2>

      <div class="pod__temperature pod__temperature--current">
        Current: {{ pod.measurements.temperature }}&nbspC
      </div>
      <div class="pod__temperature pod__temperature--low">
        Low: {{ pod.smartMode.lowTemperatureThreshold }}&nbspC
      </div>
      <div class="pod__temperature pod__temperature--high">
        High: {{ pod.smartMode.highTemperatureThreshold }}&nbspC
      </div>
    </div>
  `
})

new Vue({
  el: "#vue-root",
  data() {
    return {
      podsLoading: false,
      activePods: [],
      fetchingInterval: undefined,
    }
  },
  async mounted() {
    this.activePods = await this.getSensiboData()

    this.fetchingInterval = setInterval(async () => {
      this.activePods = await this.getSensiboData()
    }, 10000)
  },
  beforeDestroy() {
    clearInterval(this.fetchingInterval)
  },
  methods: {
    getSensiboData: async () => {
      this.podsLoading = true

      const res = await fetch("/api/v0/sensibo/pods")
      const json = await res.json()

      this.podsLoading = false

      return json.result
    },
  },
})
