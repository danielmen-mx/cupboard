<template>
  <div v-resize="onResize">
    <v-footer class="bg-orange-darken-4 text-center d-flex flex-column" >
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          :icon="icon"
          variant="text"
        ></v-btn>
      </div>
      <div class="pt-2" :class="footerText">
        <p>Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc.</p>
        <p><strong>Shaddai Shop</strong>, we love that you look good.</p>
      </div>
      <v-divider></v-divider>
      <div class="pt-2">
        Copyright © 2016-{{ new Date().getFullYear() }} | <strong class="satisfy-font font-size-xsm">Shaddai Shop</strong>
      </div>
    </v-footer>
  </div>
</template>
<script>
import responsiveLayout from '../Common/Responsives/layout.vue'

export default {
  extends: responsiveLayout,
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      // 'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
}
</script>
<style>
.feet {
  position: sticky;
  bottom:0;
}
</style>