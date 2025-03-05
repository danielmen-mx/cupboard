<template>Skeleton loader comming soon</template>
<script>
import OneSingleLineLoader from './Common/OneSingleLineLoader.vue';
import OneSingleCircleLoader from './Common/OneSingleCircleLoader.vue';
import TwoLineLoader from './Common/TwoLineLoader.vue';
import TitleLoader from './Common/TitleLoader.vue';

export default {
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