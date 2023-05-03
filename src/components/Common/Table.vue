<template></template>
<script>
export default {
  data() {
    return {
      apiService: null,
      items: [],
      item: null,
      itemId: null,
      // query: {},
      preventSnackbar: false,
      event: 'updateTable'
    }
  },
  computed: {
    queryParams() {
      var params = {};

      for (let field in this.query) {

        if (Array.isArray(this.query[field])) {
          if (this.query[field].length > 0) {
            params[field] = this.query[field].join(",");
          } else {
            params[field] = null;
          }
        } else {
          params[field] = this.query[field];
        }
      }

      return params;
    },
  },
  methods: {
    successCallBack() {},
    // index()
    async getItems() {
      if (this.breakRequest()) return

      try {
        this.loading = true

        var params = {
          ...this.queryParams,
        };

        params = {
          params: params,
        };

        const resp = await this.apiService.index(params)
        // console.log(resp)
        
        this.items = resp.data
        if (!this.preventSnackbar) {
          this.successSnackbar(resp.message)
        }
        this.loading = false
        this.successCallBack()
      } catch (error) {
        console.log(error)
      }
    },
    // show()
    async getItem() {
      if (this.breakRequest()) return

      try {
        this.loading = true

        const resp = await this.apiService.show(this.itemId)
        this.item = resp.data
        // console.log(resp)

        if (!this.preventSnackbar) {
          this.successSnackbar(resp.message)
        }

        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
    addItem() {

    },
    async remove(id) { // remove()
      if (this.breakRequest()) return

      try {
        this.loading = true

        const resp = await this.apiService.remove(id)

        var newItems = this.items.filter(item => item.id !== id)
        this.items = newItems

        if (!this.preventSnackbar) {
          this.successSnackbar(resp.message)
        }
        this.loading = false
        this.successCallBack()
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