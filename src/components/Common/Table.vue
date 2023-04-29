<template></template>
<script>
export default {
  data() {
    return {
      items: [],
      item: null,
      preventSnackbar: false,
      apiService: null
    }
  },
  methods: {
    async getItems() { // index()
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
    async getItem(id) { // show()
      if (this.breakRequest()) return

      try {
        this.loading = true

        const resp = await this.apiService.show(id)
        // console.log(resp)

        this.item = resp.data
        if (!this.preventSnackbar) {
          this.successSnackbar(resp.message)
        }
        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
    async remove(id) { // remove()
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