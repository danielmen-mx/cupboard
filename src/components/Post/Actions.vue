<template>
  <v-card-actions>
    <v-btn
      color="orange"
      @click=""
    >
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
import ReactionService from '@/services/ReactionService'
import Form from '../Common/Form.vue'

export default {
  extends: Form,
  data() {
    return {
      apiService: ReactionService
    }
  },
  methods: {
    focusInput() {
      this.fireEvent('focus-comment-input')
    }
  },
}
</script>