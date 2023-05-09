<template>
  <v-list :lines="false" nav >
    <v-list-item @click="toggleTheme">
      <template v-slot:prepend>
        <v-icon :icon="themeIcon"></v-icon>
      </template>

      <v-list-item-title>Cambiar tema</v-list-item-title>
    </v-list-item>
  </v-list>
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
      console.log(currentTheme.value)
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