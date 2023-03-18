<template>
  <router-view />
</template>
<script>
import providers from "./providers";

export default {
  name:"App",
  data(){
    return {
    }
  },
  provide:providers
}
</script>