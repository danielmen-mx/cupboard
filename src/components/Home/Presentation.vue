<template>
  <div class="bg-pink-lighten-1 title-container rounded py-2">
    <span class="text-h2 text-center main-title">See whats news</span>
  </div>
</template>
<style>
.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-title {
  color: white;
  font-size: xx-large;
  text-align: center;
  float: initial;

  display: block;
  font-family: system-ui cursive;
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