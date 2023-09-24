<template>
  <div class="main-section" :class="colorAtTime">
    <div class="d-flex flex-column fill-height justify-cente mt-10 align-center">
      <div class="bg-black rounded text-center pa-4" style="opacity: 0.8;">
        <h1 class="text-h4 font-weight-thin glow cursor-pointer" @click="turnDashboard()">
          Shaddai Shop
        </h1>
      </div>
    </div>
    <div class="wave wave1"></div>
    <div class="wave wave2 sepia"></div>
    <div class="wave wave3 grayscale"></div>
    <div class="wave wave4 huerotate"></div>
    <div class="feet"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      colorAtTime: ''
    }
  },
  methods: {
    turnDashboard() {
      this.fireEvent('turn-dashboard', '/admin')
    }
  },
  mounted() {
    let time = new Date().getHours()

    this.colorAtTime = 'bg-indigo-darken-4'
    if (time >= 6) this.colorAtTime = 'bg-light-blue-darken-4'
    if (time >= 8) this.colorAtTime = 'bg-light-blue-lighten-1'
    if (time >= 10) this.colorAtTime = 'bg-light-blue-lighten-4'
    if (time >= 12) this.colorAtTime = 'bg-cyan-lighten-3'
    if (time >= 16) this.colorAtTime = 'bg-orange-accent-2'
    if (time >= 18) this.colorAtTime = 'bg-blue-darken-4'
    if (time >= 20) this.colorAtTime = 'bg-deep-purple-darken-4'
    if (time >= 22) this.colorAtTime = 'bg-indigo-darken-4'
  },
}
</script>
<style>
.main-section {
  position: relative;
  width: 100%;
  height: 24vh;
  overflow: hidden;
}

.glow {
  font-size: 80px;
  color: #fff;
  text-align: center;
  animation: glow 2s ease-in-out infinite alternate;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: url('/images/wave.png');
  background-size: 1000px 100px;
}

.feet {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20px;
  background-color: white;
  opacity: 0.9;
  background-size: 1000px 100px;
}

.wave.wave1 {
  animation: animate 30s linear infinite;
  z-index: 1000;
  opacity: 0.8;
  animation-delay: 0s;
  bottom: 0;
}

.wave.wave2 {
  animation: animate2 15s linear infinite;
  z-index: 999;
  opacity: 0.4;
  animation-delay: -5s;
  bottom: 10px;
}

.wave.wave3 {
  animation: animate 30s linear infinite;
  z-index: 998;
  opacity: 0.2;
  animation-delay: -2s;
  bottom: 15px;
}

.wave.wave4 {
  animation: animate2 15s linear infinite;
  z-index: 997;
  opacity: 0.6;
  animation-delay: -7s;
  bottom: 20px;
}

@keyframes animate {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 1000px;
  }
}

@keyframes animate2 {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: -1000px;
  }
}

@keyframes glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
  }
  
  to {
    text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
  }
}

/*Filter styles*/
.saturate { filter: saturate(3); }
.grayscale { filter: grayscale(100%); }
.contrast { filter: contrast(160%); }
.brightness { filter: brightness(0.25); }
.blur { filter: blur(3px); }
.invert { filter: invert(100%); }
.sepia { filter: sepia(100%); }
.huerotate { filter: hue-rotate(180deg); }
.rss.opacity { filter: opacity(50%); }
</style>