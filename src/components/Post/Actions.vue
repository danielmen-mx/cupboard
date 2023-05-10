<template>
  <v-card-actions>
    <v-btn color="orange">
      Me gusta
    </v-btn>
    <v-btn 
      color="orange"
      @click="focusInput()"
    >
      Comentar
    </v-btn>
  </v-card-actions>
</template>
<script>
export default {
  methods: {
    focusInput() {
      this.fireEvent('focus-comment-input')
    }
  },
}
</script>