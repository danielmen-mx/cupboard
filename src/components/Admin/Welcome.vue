<template>
  <v-card>
    <v-card-item :title="`Bienvenido de nuevo, ` + user">
      <template v-slot:subtitle>
        <!-- <v-icon
          icon="mdi-alert"
          size="18"
          color="error"
          class="me-1 pb-1"
        ></v-icon> -->

        {{ date }}
      </template>
    </v-card-item>
    <v-card-item>
      
    </v-card-item>
  </v-card>
</template>
<script>
import store from '../../store'
import { getCurrentDate } from '../../utils/helpers'

export default {
  mixins: [getCurrentDate],
  data() {
    return {
      user: 'user',
      date: null
    }
  },
  mounted() {
    let user = store.getters['user']
    this.date = this.getCurrentDate()

    if (!user) return

    this.user = user.fullname??user.username
  },
}
</script>