<template>
  <div
    v-for="comment in comments"
    :key="comment.id"
  >
    <v-card class="elevation-0 d-flex bg-grey-lighten-4 rounded-xl my-1">
      <template class="d-flex align-start pa-3">
        <v-avatar
          color="blue-darken-3"
        >
          <span class="text-h6">{{ initials(comment.autor) }}</span>
        </v-avatar>
      </template>
      <div>

      </div>
      <v-card-text class="pa-2">
        <div
          class="text-subtitle-2 text-decoration-underline"
        >
          <strong>{{ comment.autor }}</strong>
        </div>
        <div
          class="text-subtitle-1"
        >
          {{ comment.comment }}
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    commments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      
    }
  },
  mounted() {
    
  },
}
</script>