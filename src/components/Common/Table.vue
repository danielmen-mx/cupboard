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
      preventRemoveItem: false,
      preventReload: false,
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
        this.loading = false
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
    addItem(item) {
      let match = this.items.find(i => i.id === item.id)

      if (match) {
        let newItems = this.items.map(function (val) {
          if (val.id === item.id) {
            return val = item
          }
  
          return val
        })

        return this.items = newItems
      }

      return this.items.push(item)
    },
    async remove(id) { // remove()
      if (this.breakRequest()) return

      try {

        if (!this.preventReload) {
          this.loading = true
        }

        const resp = await this.apiService.remove(id)

        if (!this.preventRemoveItem) {
          this.removeItem(id)
        }

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
    removeItem(id) {
      let newItems = null
      this.items.forEach((item, i) => {
        if (item.id === id) newItems = this.items.toSpliced(i, 1)
      });

      this.items = newItems
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