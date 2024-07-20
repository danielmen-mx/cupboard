<template>
  <div class="d-flex align-center">
    <v-rating
      :model-value="rating.review"
      readonly
      color="amber"
      size="x-small"
    ></v-rating>
    <p class="text-grey text-subtitle-2">
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
  methods: {
    updateData(model) {
      if (this.parent_rating.id !== model.rating.id) return
      this.rating = model.rating
    }
  },
  mounted() {
    if (!this.parent_rating) return
    this.rating = this.parent_rating
    this.listenEvent("update-ratings", this.updateData)
  },
  beforeDestroy() {
    this.unlistenEvent("update-ratings", this.updateData)
  },
}
</script>