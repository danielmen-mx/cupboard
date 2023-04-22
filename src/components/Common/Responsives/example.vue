<template></template>
<style scoped></style>
<script>
import Responsive from '../Responsive.vue'

export default {
  extends: Responsive,
  data() {
  return {
      
    }
  },
  methods: {
    responsiveConfiguration() {
      
    },
  },
  mounted() {
    this.emitter.on('responsiveFit', () => {
      // if (this.localResponsive == this.windowSize) return
      // this.localResponsive = this.windowSize

      this.$nextTick(() => {
        this.responsiveConfiguration()
        // console.log('Responsive comments is working fine!')
      })
    })
  },
}
</script>