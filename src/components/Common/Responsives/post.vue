<template></template>
<style scoped></style>
<script>
import Responsive from '../Responsive.vue'

export default {
  extends: Responsive,
  data() {
  return {
      fontInfoText: 'text-h6'
    }
  },
  methods: {
    responsiveConfiguration() {
      if (this.windowSize.height < 360) {
        this.fontInfoText = 'text-subtitle-1'
      }

      if (this.windowSize.height < 299) {
        this.fontInfoText = 'text-caption'
      }

      if (this.windowSize.height > 299) {
        this.fontInfoText = 'text-subtitle-1'
      }

      if (this.windowSize.height > 360) {
        this.fontInfoText = 'text-h6'
      }
    },
  },
  mounted() {
    this.emitter.on('responsiveFit', () => {
      // if (this.localResponsive == this.windowSize) return
      // this.localResponsive = this.windowSize

      this.$nextTick(() => {
        this.responsiveConfiguration()
        // console.log('Responsive post is working fine!')
      })
    })
  },
}
</script>