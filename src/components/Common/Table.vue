<template></template>
<script>
export default {
  data() {
    return {
      apiService: null,
      items: [],
      paginationProps: [],
      item: null,
      itemId: null,
      itemsPerPage: 15,
      query: {
        per_page: 15,
        page: 1
      },
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
        this.items = resp.data
        this.paginationProps = resp.pagination??resp.pagination

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
    async getItem() {
      if (this.breakRequest()) return

      try {
        this.loading = true

        const resp = await this.apiService.show(this.itemId)
        this.item = resp.data

        if (!this.preventSnackbar) {
          this.successSnackbar(resp.message)
        }

        this.loading = false
        this.successCallBack(this.item)
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
    async remove(id) {
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
        this.successCallBack(id)
      } catch (error) {
        console.log(error)
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