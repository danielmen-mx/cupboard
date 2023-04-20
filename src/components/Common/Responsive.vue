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
      console.log('WindowSize is: ', this.windowSize)
    },
    adviceReload(component, data) {
      this.emitter.emit(component, data)
    }
  },
  mounted() {
    this.onResize()
  },
}
</script>