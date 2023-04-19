<template></template>
<script>
import Responsive from '../Responsive.vue'

export default {
  extends: Responsive,
  data() {
    return {
      responsiveNavIcon: false,
      navIcon: false,
      localResponsive: {}
    }
  },
  methods: {
    responsiveConfiguration() {

      if (this.windowSize.height < 515) {
        this.navIcon = true
      }

      if (this.windowSize.height > 515) {
        this.navIcon = false
      }

      if (this.windowSize.width < 900) {
        this.navIcon = true
      }

      if (this.windowSize.width > 900) {
        this.navIcon = false
      }

      // this.$nextTick(() => {
      //   this.adviceReload('layoutNavBar', this.responsiveNavIcon)
      // })
    },
  },
  mounted() {
    this.emitter.on('responsiveFit', () => {
      this.$nextTick(() => {
        this.responsiveConfiguration()
        // console.log('Responsive layout is working fine!')
      })
    })
  },
}
</script>