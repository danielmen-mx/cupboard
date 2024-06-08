<template>
  <Item />
</template>
<script>
import Button from '../layouts/Button.vue'
import Item from '../../components/Store/Item.vue'

export default {
  components: {
    Button,
    Item
  },
  data: () => ({
    step: 1,
    drawer: false,
  }),
  computed: {

  },
  methods: {

  },
  mounted() {
  },
  beforeDestroy() {

  },
}
</script>