<template>
  <div>
    <v-row>
      <v-col>
        <ItemsPreview />
      </v-col>
      <v-col>
        <Gateway />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Gateway from '../components/Checkout/PaymentGateway.vue';
import ItemsPreview from '../components/Checkout/ItemsPreview.vue';

export default {
  components: {
    Gateway,
    ItemsPreview,
  },
  data() {
    return {
      modelId: null,
      modelType: null,
    }
  },
  mounted() {
    const { modelId: identifier } = this.$route.params;
    const [prefix, id] = identifier.split('identifier=');
    this.modelType = id ? 'user' : 'item';
    this.modelId = id || identifier;
  },
}
</script>