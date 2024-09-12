<template></template>
<script>
export default {
  data() {
    return {
      apiService: null,
      loading: false,
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
      return Object.fromEntries(
        Object.entries(this.query).map(([field, value]) => [
          field,
          Array.isArray(value) ? (value.length > 0 ? value.join(",") : null) : value
        ])
      );
    }
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
        // console.log(this.items) // test purposes
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
      const index = this.items.findIndex(i => i.id === item.id);

      index !== -1
        ? this.items[index] = item
        : this.items.push(item);
    },
    async remove(id) {
      if (this.breakRequest()) return

      try {
        if (!this.preventReload) this.loading = true

        const resp = await this.apiService.remove(id)

        if (!this.preventRemoveItem) this.removeItem(id)
        if (!this.preventSnackbar) this.successSnackbar(resp.message)
        this.loading = false
        this.successCallBack(id)
      } catch (error) {
        console.log(error)
      }
    },
    removeItem(id) {
      this.items = this.items.filter(item => item.id !== id)
    },
    itemFound(id) {
      return !!this.items.find(i => i.id === id);
    },
    breakRequest() {
      if (!this.apiService) {
        console.error("No api service declared");
      }
      return !this.apiService;
    }
  },
  mounted() {
    
  },
}
</script>