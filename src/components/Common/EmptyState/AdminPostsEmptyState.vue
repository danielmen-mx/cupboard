<template>
  <v-divider></v-divider>
  <div class="elevation-0 bg-grey-lighten-4 rounded-xl my-2 py-10 text-center text-grey-darken-3">
    <v-avatar class="bg-grey-lighten-1" size="150">
      <v-icon
        size="100"
        color="grey-darken-1"
      >mdi-table-large</v-icon>
    </v-avatar>
    <p class="text-h4 my-2 pt-6 text-grey-darken-2">{{ translate("empty-states.AdminPosts.no-posts") }}</p>
    <v-btn
      :ripple="false"
      class="text-h6 my-2 text-grey-darken-2 text-decoration-underline"
      variant="plain"
      @click="openPostForm()"
    >{{ translate("empty-states.AdminPosts.add-new") }}</v-btn>
  </div>
</template>
<script>
export default {
  methods: {
    openPostForm() {
      this.fireEvent('openPostForm')
    }
  },
}
</script>