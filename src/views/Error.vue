<template>
  <v-container fill-height fluid pa-0 ma-0 class="col-back">
    <v-layout align-center justify-center>
      <!-- <v-flex> -->
        <v-row>
          <v-col class="d-flex flex-column justify-space-between align-center col-lg-12 col-md-12">
            <img src="https://webassets.io/img/webforceio_white_320.png" alt="WebForce" class="my-16">
            <v-alert
              colored-border
              type="error"
              elevation="2"
              height="50"
              class="my-16"
            >
              The route you are trying to navigate does not exist
            </v-alert>
            <router-link  class="white--text mt-16 pt-16" to="/">Back to home</router-link>
            <div class="d-flex justify-center align-center mt-10">
              <span class="powered">Powered by</span>
              <img src="https://webassets.io/img/logo-white.png" alt="WebForce">
            </div>
          </v-col>
        </v-row>
      <!-- </v-flex> -->
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    name: "Error",
  }
</script>
<style scoped>
  .col-back {
    background-image: url('https://webassets.io/img/home-bg-x2.png');
    background-color: #005BEA;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
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
