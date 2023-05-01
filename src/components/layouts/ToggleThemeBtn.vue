<template>
  <v-btn @click="toggleTheme" text rounded>
    <v-icon>{{ themeIcon }}</v-icon>
  </v-btn>
</template>
<script>
import { useTheme } from 'vuetify'
import { ref, reactive } from 'vue'

export default {
  setup () {
    const theme = useTheme()
    let themeIcon = ref(theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night')

    function toggleTheme() {
      theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
      themeIcon.value = theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'
    }

    return {
      theme,
      toggleTheme,
      themeIcon
    }
  }
}
</script>