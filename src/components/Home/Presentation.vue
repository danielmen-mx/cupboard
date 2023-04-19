<template>
  <div
    class="bg-pink-lighten-1 title-container rounded py-2"
    v-resize="onResize"
  >
    <span
     class="text-center main-title"
     :class="presentationText"
    >
      See whats new
    </span>
  </div>
</template>
<script>
import ResponsivePosts from '@/components/Common/Responsives/posts.vue'

export default {
  extends: ResponsivePosts
}
</script>
<style>
.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-title {
  color: white;
  
  text-align: center;
  float: initial;

  display: block;
  font-family: Alex Brush;
  white-space: nowrap;
  border-right: 4px solid;
  width: 13ch;

  animation: typing 3s steps(13),
  blink .5s infinite step-end alternate;
  overflow: hidden;
}

@keyframes typing {
  from { width: 0 }
}

@keyframes blink {
  50% { border-color: transparent }
}
</style>