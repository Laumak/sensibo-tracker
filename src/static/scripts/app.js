Vue.component('pod-template', {
  name: "pod-template",
  props: ["pod"],
  template: `
    <div class="pod">
      <h2 class="pod__name">
        {{ pod.room.name }}
      </h2>

      <div class="pod__temperature">
        {{ pod.measurements.temperature }}&nbspC
      </div>
    </div>
  `
})

new Vue({
  el: "#vue-root",
  data() {
    return {
      podsLoading: false,
      activePods: []
    }
  },
  async mounted() {
    this.activePods = await this.getSensiboData()
  },
  methods: {
    getSensiboData: async () => {
      this.podsLoading = true

      const res = await fetch("/api/v0/sensibo/pods")
      const json = await res.json()

      this.podsLoading = false

      return json.result
    }
  },
})
