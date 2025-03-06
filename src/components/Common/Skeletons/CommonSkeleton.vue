<template>
  <div v-if="type === 'card'">
    <v-card>
      <TitleLoader height="15vh" />
      <div class="d-flex justify-center justify-space-around align-center">
        <OneSingleCircleLoader size="55"/>
        <OneSingleLineLoader width="75%" />
      </div>
    </v-card>
  </div>
  <div v-if="type === 'list'">
    <v-card>
      <v-list>
        <v-list-item>
          <TitleLoader height="5vh" />
          <v-divider class="my-2"></v-divider>
        </v-list-item>
        <v-list-item v-for="index in 4" :key="'two-line-' + index">
          <TwoLineLoader />
        </v-list-item>
        <v-list-item>
          <OneSingleLineLoader />
        </v-list-item>
      </v-list>
    </v-card>
  </div>
  <div v-if="type === 'table'">
    <v-card class="py-2">
      <div class="d-flex justify-center justify-space-around align-center">
        <TitleLoader v-for="index in 5" :key="index" :width="'15%'" />
      </div>
      <v-divider class="my-2"></v-divider>
      <div v-for="index in 6" :key="index" class="d-flex justify-space-around justify-left align-center">
        <OneSingleCircleLoader size="35"/>
        <OneSingleLineLoader width="75%" />
      </div>
    </v-card>
  </div>
  <div v-if="type === 'gateway'">
    <v-card>
      <v-list>
        <v-list-item>
          <TitleLoader height="5vh"/>
        </v-list-item>
        <v-list-item v-for="index in 4" :key="'two-line-' + index">
          <OneSingleLineLoader height="3vh" />
        </v-list-item>
        <v-list-item>
          <OneSingleLineLoader height="4vh" class="my-4" />
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>
<script>
import OneSingleLineLoader from './Common/OneSingleLineLoader.vue';
import OneSingleCircleLoader from './Common/OneSingleCircleLoader.vue';
import TwoLineLoader from './Common/TwoLineLoader.vue';
import TitleLoader from './Common/TitleLoader.vue';

export default {
  props: {
    type: {
      type: String,
      required: true,
      default: "card"
    }
  },
  components: {
    OneSingleLineLoader,
    OneSingleCircleLoader,
    TwoLineLoader,
    TitleLoader,
  },
  data() {
    return {
      OneSingleLineLoader: OneSingleLineLoader,
      OneSingleCircleLoader: OneSingleCircleLoader,
      TwoLineLoader: TwoLineLoader,
      TitleLoader: TitleLoader,
    }
  },
}
</script>
<style scoped>
.centered-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
}
</style>