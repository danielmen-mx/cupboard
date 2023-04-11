<template>
  <div class="my-2 ml-1 mr-3">
    <v-form>
      <v-text-field
        v-model="comment"
        :disabled="sendingMessage"
        append-icon="mdi-send"
        clear-icon="mdi-close-circle"
        clearable
        label="Message"
        type="text"
        @click:append="sendComment"
        
      >
        <template v-slot:append-inner>
          <v-fade-transition leave-absolute>
            <v-progress-circular
              v-if="sendingMessage"
              color="info"
              indeterminate
              size="24"
            ></v-progress-circular>
          </v-fade-transition>
        </template>
      </v-text-field>
    </v-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comment: '',
      sendingMessage: false,
    }
  },
  methods: {
    sendComment() {
      console.log('sending comment...')
      this.sendingMessage = true
      setTimeout(() => {
        this.sendingMessage = false
        console.log('finishing sending...')
      }, 5000);
    }
  },
}
</script>