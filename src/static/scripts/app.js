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
