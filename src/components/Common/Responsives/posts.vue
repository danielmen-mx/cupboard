<template></template>
<style scoped></style>
<script>
import Responsive from '../Responsive.vue'

export default {
  extends: Responsive,
  data() {
  return {
      words: 230,
      titleText: 'text-h3',
      postNameText: 20,
      presentationText: 'text-h2',
      imageWidth: 'auto',
      dataWidth: 'auto',
      actionHeight: 'auto',
      showPostTitle: '35vh',
      localResponsive: {},
      widthPostCard: 'auto'
    }
  },
  methods: {
    handle() {
      this.$nextTick(() => {
        // height resizes
        if (this.windowSize.height < 700) {
          this.widthPostCard = 'auto'
          this.words = 130
          this.postNameText = 16
          this.titleText = 'text-h4'
        }
        if (this.windowSize.height < 450) {
          this.postNameText = 10
        }
        if (this.windowSize.height < 360) {
          this.words = 20
          this.titleText = 'text-h6'
        }
        if (this.windowSize.height > 700) {
          this.widthPostCard = '588'
          this.words = 230
          this.postNameText = 16
          this.titleText = 'text-h3'
        }
  
        // width resizes
        if (this.windowSize.width < 1280) {
          this.widthPostCard = 'auto'
          this.words = 130
          this.titleText = 'text-h4'
          this.actionHeight = '50px'
        }
        if (this.windowSize.width < 700) {
          this.titleText = 'text-h6'
        }
        if (this.windowSize.width < 665) {
          this.words = 20
        }
        if (this.windowSize.width < 560) {
          this.presentationText = 'text-h4'
        }
        if (this.windowSize.width > 560) {
          this.presentationText = 'text-h2'
        }
        if (this.windowSize.width > 1280) {
          this.widthPostCard = '588'
          this.words = 230
          this.titleText = 'text-h3'
          this.actionHeight = 'auto'
        }
  
        // this.adviceReload('postsComponent', this.configuration)
      })
    },
  },
  mounted() {
    this.listenEvent(this.event, this.handle)
  },
}
</script>