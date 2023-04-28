<template></template>
<style scoped></style>
<script>
import Responsive from '../Responsive.vue'

export default {
  extends: Responsive,
  data() {
  return {
      width: '',
    }
  },
  methods: {
    handle() {
      this.$nextTick(() => {
        if (this.windowSize.width < 800) {
          this.width = ''
          this.adviceNewClass()
        }
  
        if (this.windowSize.width > 800) {
          this.width = '25%'
          this.adviceNewClass('d-flex justify-space-between')
        }
      })
    },
    adviceNewClass(newClass = '') {
      this.fireEvent('login-resized', {loginClass: newClass})
    }
  },
  mounted() {
    this.listenEvent(this.event, this.handle)
  },
}
</script>