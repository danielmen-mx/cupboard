import { createApp } from "vue";
import CommonSkeleton from '../components/Common/Skeletons/CommonSkeleton.vue';

export default {
  install(createApp) {
    createApp.component('BaseSkeletonLoader', CommonSkeleton);
  }
}