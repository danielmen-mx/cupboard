<template>
  <v-parallax
    height="100vh"
    lazy-src="/logo/shadai-main.jpeg"
    class="grayscale"
    >
    <div
      class="d-flex flex-column fill-height justify-center align-left"
    >
      <div class="rounded px-8 text-blue-darken-4">
        <!-- <p>🐶🐶🐶</p> -->
        <br>
        <h1 class="text-h4 font-weight-thin mb-4">
          {{ translate("empty-states.Home.working") }}
        </h1>
        <h4 class="subheading">
          {{ translate("empty-states.Home.no-posts") }}
        </h4>
      </div>
    </div>
  </v-parallax>
</template>