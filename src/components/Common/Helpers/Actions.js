export const requestItemRemoval = {
  methods: {
    /**
     * 
     * @param {String} itemId 
     * @param {VueElement} apiService 
     * @param {String} event 
     * @param {Boolean} preventRemoveItem 
     * @param {Boolean} preventSnackbar 
     * @param {Boolean} preventReload 
     */
    requestItemRemoval(itemId, apiService, event, preventRemoveItem = true, preventSnackbar = false, preventReload = false) {
      this.fireEvent('confirmation-dialog', {
        id: itemId,
        apiService: apiService,
        event: event,
        preventRemoveItem: preventRemoveItem,
        preventSnackbar: preventSnackbar,
        preventReload: preventReload,
      })
    }
  },
}