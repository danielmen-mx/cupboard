<template>
  <v-parallax
    height="100vh"
    lazy-src="../../public/logo/shadai-main.jpeg"
  >
    <div class="d-flex flex-column fill-height justify-center align-center text-white ">
      <div class="bg-black ma-2 pa-2 d-flex flex-column justify-center align-center rounded">
        <h1 class="text-h4 font-weight-thin mb-4">
          {{ translate("sorry") }}
        </h1>
        <h4 class="subheading">
          {{ translate("404") }}
        </h4>

      </div>
    </div>
  </v-parallax>
</template>
<script>
  export default {
    name: "Error",
  }
</script>
<style scoped>
  .col-back {
    background-image: "/public/logo/shadai-main.jpeg";
    background-color: #ca5009;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    height: 100vh;
  }
  .container {
    padding: 0;
  }
  .powered {
    margin-top: 20px;
    font-size: 16px !important;
    color:white;
  }
  .card-size {
    width: 400px;
    height: 50px;
  }
</style>
