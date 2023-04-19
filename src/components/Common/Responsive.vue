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
    },
  },
  mounted() {
    this.onResize()
  },
}
</script>