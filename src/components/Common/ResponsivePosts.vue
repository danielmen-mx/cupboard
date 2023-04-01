<template></template>
<style scoped></style>
<script>
export default {
  data() {
    return {
      windowSize: {},
      words: 270,
      titleText: 'text-h3',
      postNameText: 20,
      presentationText: 'text-h2',
      imageWidth: 'auto',
      dataWidth: 'auto',
      actionHeight: 'auto'
    }
  },
  methods: {
    onResize() {
      this.windowSize = { height: window.innerHeight, width: window.innerWidth }
      this.responsiveInformation()
    },
    responsiveInformation() {
      // height resizes
      if (this.windowSize.height < 700) {
        this.words = 170
        this.postNameText = 15
        this.titleText = 'text-h4'
      }
      if (this.windowSize.height < 450) {
        this.postNameText = 10
      }
      if (this.windowSize.height < 360) {
        this.words = 70
        this.titleText = 'text-h6'
      }
      if (this.windowSize.height > 700) {
        this.words = 270
        this.postNameText = 20
        this.titleText = 'text-h3'
      }

      // width resizes
      if (this.windowSize.width < 1280) {
        this.words = 170
        this.titleText = 'text-h4'
        this.actionHeight = '80px'
      }
      if (this.windowSize.width < 700) {
        this.titleText = 'text-h6'
      }
      if (this.windowSize.width < 665) {
        this.words = 70
      }
      if (this.windowSize.width < 560) {
        this.presentationText = 'text-h4'
      }
      if (this.windowSize.width > 560) {
        this.presentationText = 'text-h2'
      }
      if (this.windowSize.width > 1280) {
        this.words = 270
        this.titleText = 'text-h3'
        this.actionHeight = 'auto'
      }
    },
  },
  mounted() {
    this.onResize()
  },
}
</script>