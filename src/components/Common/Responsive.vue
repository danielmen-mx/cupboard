<template></template>
<script>
export default {
  data() {
    return {
      windowSize: {},
      event: 'responsiveFit'
    }
  },
  methods: {
    onResize() {
      this.windowSize = { height: window.innerHeight, width: window.innerWidth }
      this.fireEvent(this.event)
      // console.log('WindowSize is: ', this.windowSize)
    },
    adviceReload(component, data) {
      this.fireEvent(component, data)
    }
  },
  mounted() {
    this.onResize()
  },
}
</script>