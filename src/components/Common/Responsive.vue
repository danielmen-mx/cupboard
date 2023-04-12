<template></template>
<script>
export default {
  data() {
    return {
      windowSize: {},
    }
  },
  methods: {
    onResize() {
      this.windowSize = { height: window.innerHeight, width: window.innerWidth }
      this.emitter.emit('responsiveFit')
      console.log(this.windowSize) // uncomment onlywhen you need to check the responsive desing
    },
  },
  mounted() {
    this.onResize()
  },
}
</script>