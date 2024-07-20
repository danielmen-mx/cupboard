<template>
  <div v-if="loading"></div>
  <div v-else>
    <v-avatar
      color="white"
      size="30"
    >
      <v-icon :class="heartClass" :icon="heartIcon" :color="heartColor" @click="validateLogin()"></v-icon>
    </v-avatar>
  </div>
</template>
<script>
import Reactions from '../Common/Reactions.vue';

export default {
  extends: Reactions,
  props: {
    parent_model: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      itemId: null,
      event: "update-ratings"
    }
  },
  methods: {
    setData() {
      this.model = this.parent_model
      this.modelType = "App\\Models\\Cupboard\\Product"
      this.getReactions()
    },
    successCallBack(resp) {
      this.updateItems(resp)
      this.parent_model.reactions = this.reactions
      this.parent_model.rating = resp.rating
      this.$nextTick(() => { this.fireEvent(this.event, this.parent_model) })
      this.setForm()
    },
  },
  mounted() {
    this.setData()
  },
}
</script>