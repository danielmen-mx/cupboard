<template></template>
<style scoped></style>
<script>
import Responsive from '../Responsive.vue'

export default {
  extends: Responsive,
  data() {
  return {
      width: ''
    }
  },
  methods: {
    responsiveConfiguration() {
      if (this.windowSize.width < 800) {
        this.width = ''
      }

      if (this.windowSize.width > 800) {
        this.width = '25%'
      }
    },
  },
  mounted() {
    this.emitter.on('responsiveFit', () => {
      // if (this.localResponsive == this.windowSize) return
      // this.localResponsive = this.windowSize

      this.$nextTick(() => {
        this.responsiveConfiguration()
        // console.log('Responsive login is working fine!')
      })
    })
  },
}
</script>