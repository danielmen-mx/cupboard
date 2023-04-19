<template>
  <Presentation />
  <v-divider class="my-2"></v-divider>
  <Posts />
</template>
<script>
import Presentation from '@/components/Home/Presentation.vue'
import Posts from '@/components/Home/Posts.vue'
import ResponsivePosts from '@/components/Common/posts.vue'

export default {
  // extends: ResponsivePosts,
  components: {
    Presentation,
    Posts
  },
  data() {
    return {
      page: 1
    }
  },
}
</script>