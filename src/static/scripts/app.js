new Vue({
  el: "#vue-root",
  data() {
    return {
      activePods: []
    }
  },
  async mounted() {
    this.activePods = await this.getSensiboData()
  },
  methods: {
    getSensiboData: async () => {
      const res = await fetch("/api/v0/sensibo/pods")
      const json = await res.json()

      return json.result
    }
  },
})
