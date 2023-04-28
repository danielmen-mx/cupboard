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
    handle() {
      this.$nextTick(() => {
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
      })
    },
  },
  mounted() {
    this.listenEvent(this.event, this.handle)
  },
}
</script>