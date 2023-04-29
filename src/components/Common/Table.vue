<template></template>
<script>
export default {
  data() {
    return {
      items: [],
      preventSnackbar: false,
      apiService: null
    }
  },
  methods: {
    async getItems() {
      if (this.breakRequest()) return

      try {
        this.loading = true

        const resp = await this.apiService.index()
        // console.log(resp)

        this.items = resp.data
        if (!this.preventSnackbar) {
          this.successSnackbar(resp.message)
        }
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    async remove(id) {
      if (this.breakRequest()) return

      try {
        // var items = this.items
        this.loading = true

        const resp = await this.apiService.remove(id)

        this.$nextTick(() => {
          var newItems = this.items.filter(item => item.id !== id)
          this.items = newItems
          this.successSnackbar(resp.message)
          this.loading = false
        })
      } catch (error) {
        console.log(error)
        // this.errorSnackbar(resp.data.error)
      }
    },
    breakRequest() {
      if (!this.apiService) {
        console.error("No api service declared");
        return true
      }

      return false
    },
  },
  mounted() {
    
  },
}
</script>