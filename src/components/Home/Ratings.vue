<template>
  <HomeRatingSkeleton v-if="loading" :class="customClass" />
  <v-row v-else :class="customClass" >
    <v-rating
      :model-value="rating"
      color="amber"
      density="compact"
      half-increments
      readonly
      size="small"
    ></v-rating>

    <div class="text-grey ms-4">
      {{ rating }} stars ({{ reactions }} reactions)
    </div>
  </v-row>
</template>
<script>
import HomeRatingSkeleton from '@/components/Common/Skeletons/HomeRatingSkeleton.vue'

export default {
  components: {
    HomeRatingSkeleton
  },
  props: {
    parent_class: {
      type: String,
      required: true
    },
    parent_post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: true,
      customClass: '',
      reactionsArr: {},
      rating: 0,
      reactions: 0
    }
  },
  methods: {
    setData() {
      this.customClass = this.parent_class
      this.rating = this.parent_post.rating
      this.reactionsArr = this.parent_post.reactions
      this.reactions = this.postReactions
      this.loading = false
    },
    updateReactions(resp) {
      if (this.parent_post.id !== resp.id) return
      this.rating = resp.rating
      this.reactionsArr = resp.reactions
      this.reactions = this.postReactions
    }
  },
  computed: {
    postReactions() {
      let num = 0

      if (this.reactionsArr.length <= 0) return num

      this.reactionsArr.map(reaction => {
        if (reaction.reaction === true) num++
      })

      return num
    },
  },
  mounted() {
    this.setData()
    this.listenEvent('update-reactions', this.updateReactions)
  },
}
</script>