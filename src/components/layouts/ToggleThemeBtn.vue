<template>
  <v-btn @click="toggleTheme" text rounded>
    <v-icon>{{ themeIcon }}</v-icon>
  </v-btn>
</template>
<script>
import { useTheme } from 'vuetify'
import { ref, reactive } from 'vue'
import store from '../../store'

export default {
  setup() {
    const theme = useTheme()
    let currentTheme = ref(store.getters['theme'])
    let themeIcon = ref(currentTheme.value == 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny')
    theme.global.name.value = currentTheme.value

    function toggleTheme() {
      theme.global.name.value = currentTheme.value == 'light' ? 'dark' : 'light'
      themeIcon.value = theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'
      currentTheme.value = currentTheme.value == 'light' ? 'dark' : 'light'

      store.commit('setTheme', { theme: currentTheme.value });
    }

    return {
      theme,
      toggleTheme,
      themeIcon
    }
  },
}
</script>