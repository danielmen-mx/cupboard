<template></template>
<script>
import Responsive from '../Responsive.vue'

export default {
  extends: Responsive,
  data() {
    return {
      navIcon: false, // modify for tests purposes
    }
  },
  methods: {
    responsiveConfiguration() {
      // if (this.windowSize.height < 450 && this.windowSize.width < 840) this.navIcon = true
      // if (this.windowSize.height > 450) this.navIcon = false

      // if (this.windowSize.width < 850) this.navIcon = true
      // if (this.windowSize.width > 850) this.navIcon = false

      this.adviceReload()
      console.log('navIcon is: ', this.navIcon)
    },
    adviceReload() {
      this.emitter.emit('reloadComponent')
    }
  },
  mounted() {
    this.emitter.on('responsiveFit', () => {
      this.responsiveConfiguration()
      console.log('Responsive layout is working fine!')
    })
  },
}
</script>