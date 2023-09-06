<template>
  <v-card class="elevation-0 bg-grey-lighten-4 rounded-xl my-1 py-4 pl-10 text-center text-grey-darken-3">
    <v-avatar color="grey-lighten-2" size="100">
      <v-icon class="text-h2">
        mdi-comment-remove-outline
      </v-icon>
    </v-avatar>
    <p class="pt-6">
      {{ $t("empty-states.Comments.no-comments") }}
    </p>
    <p class="text-h4">
      {{ $t("empty-states.Comments.add-new") }}
    </p>
  </v-card>
</template>