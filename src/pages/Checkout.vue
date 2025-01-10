<template>
  Here's the checkout component my man
</template>
<script>
export default {
  data() {
    return {
      modelId: null,
    }
  },
  mounted() {
    // TODO: check it up Sprint Cart Checkout && Single Item Checkout to finish module
    // you receive an Id from $route, this id is knowed as modelId,
    // the modelId represent user id or item (product) id
    // add a way to identify wich one is received with the string "identifier"
    // if the string "identifier" exists, the modelId is a user id
    // use this to call the API wich responds with the current record, a complete cart, or a single item
    // when you get this stop && take a rest, continue thinking about next steps
    console.log(this.$route.params)
    this.modelId = this.$route.params.id
  },
}
</script>