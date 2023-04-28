<template></template>
<script>
import Responsive from '../Responsive.vue'

export default {
  extends: Responsive,
  data() {
    return {
      navIcon: false,
      footerText: 'text-subtitle-1',
      localResponsive: {}
    }
  },
  methods: {
    handle() {
      this.$nextTick(() => {
        if (this.windowSize.height < 515) {
          this.navIcon = true
          // this.footerText = 'text-subtitle-2'
          this.footerText = 'text-caption'
        }
  
        if (this.windowSize.height > 515) {
          this.navIcon = false
          this.footerText = 'text-subtitle-1'
        }
  
        if (this.windowSize.width < 900) {
          this.navIcon = true
          // this.footerText = 'text-subtitle-2'
          this.footerText = 'text-caption'
        }
  
        if (this.windowSize.width > 900) {
          this.navIcon = false
          this.footerText = 'text-subtitle-1'
        }
  
        // this.$nextTick(() => {
        //   this.adviceReload('layoutNavBar', this.responsiveNavIcon)
        // })
      })
    },
  },
  mounted() {
    this.listenEvent(this.event, this.handle)
  },
}
</script>