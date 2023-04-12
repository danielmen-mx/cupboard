<template></template>
<script>
import Responsive from '../Responsive.vue'

export default {
  extends: Responsive,
  data() {
    return {
      navIcon: false,
    }
  },
  methods: {
    responsiveConfiguration() {
      // si navIcon es false se debe verificar el window size para convertirlo en true
      if (this.navIcon) {
        if (this.windowSize.width > 850) this.navIcon = false
        if (this.windowSize.height > 450) this.navIcon = false
        this.adviceReload()
      }

      if (!this.navIcon) {
        if (this.windowSize.width < 850) this.navIcon = true
        if (this.windowSize.height < 450) this.navIcon = true
        this.adviceReload()
      }

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