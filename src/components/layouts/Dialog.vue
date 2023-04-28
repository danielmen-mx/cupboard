<template>
  <v-row justify="center">
    <v-dialog
      v-model="visible"
      persistent
      width="auto"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{ title }}
        </v-card-title>
        <v-card-text>
          {{ text }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="visible = false"
          >
            Close
        </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
    data () {
      return {
        visible: false,
        title: '',
        text: '',
        event: 'openDialog'
      }
    },
    methods: {
      handle() {
        this.visible = false
        this.title = data.title
        this.text = data.text
        this.$nextTick(() => {
          this.visible = true
        })
      }
    },
    mounted() {
      this.listenEvent(this.event, this.handle)
    },
  }
</script>