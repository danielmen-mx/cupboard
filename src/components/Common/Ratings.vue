<template>
  <div class="d-flex align-center">
    <v-rating
      :model-value="rating.review"
      readonly
      color="amber"
      size="small"
    ></v-rating>
    <p class="text-grey">
      ({{ rating.review }} {{ translate("stars").toLowerCase() }})
    </p>
  </div>
</template>
<script>
import RatingSkeleton from './Skeletons/RatingSkeleton.vue';

export default {
  components: { RatingSkeleton },
  props: {
    parent_rating: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      rating: {}
    }
  },
  mounted() {
    if (!this.parent_rating) return
    this.rating = this.parent_rating
  }
}
</script>