<template>
  <p class="text-subtitle-2 pl-1 pt-1">Opciones</p>
  <v-list
      :lines="false"
      nav
    >
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