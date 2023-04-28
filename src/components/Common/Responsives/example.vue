<template></template>
<style scoped></style>
<script>
import Responsive from '../Responsive.vue'

export default {
  extends: Responsive,
  data() {
    return {
      //
    }
  },
  methods: {
    handle() {
      // if (this.localResponsive == this.windowSize) return
      // this.localResponsive = this.windowSize
      this.$nextTick(() => {
        //
      })
    },
  },
  mounted() {
    this.listenEvent(this.event, this.handle)
  },
}
</script>