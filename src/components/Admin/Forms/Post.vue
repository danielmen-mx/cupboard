<template>
  <v-window v-model="step">
  <v-window-item :value="1">
    <span>First step example</span>
  </v-window-item>

  <v-window-item :value="2">
    <span>Second step example</span>
  </v-window-item>

  <v-window-item :value="3">
    <span>Third step example</span>
  </v-window-item>
</v-window>
</template>
<script>

export default {
  props: {
    current_step: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      step: null
    }
  },
  mounted() {
    this.step = this.current_step
  },
  watch: {
    'current_step': {
      handler: function () {
        return this.step = this.current_step
      },
      deep: true,
      immediate: true
    }
  }
}
</script>