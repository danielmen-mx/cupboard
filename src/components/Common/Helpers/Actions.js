export const openConfirmation = {
  methods: {
    openConfirmation(id) {
      this.fireEvent('confirmation-dialog', id)
    }
  },
}