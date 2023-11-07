<template>
  <v-row justify="center">
    <v-navigation-drawer
      v-model="drawer"
      location="right"
      width="700"
      class="pa-2"
      temporary
    >
      <v-card class="mx-auto pa-2 ma-2 elevation-0 bg-grey-lighten-3">
        <template class="d-flex justify-space-between pa-2">
          <v-card-title class="text-h6 font-weight-regular justify-space-between">
            <v-avatar
              color="blue-accent-3"
              size="24"
              v-text="step"
            ></v-avatar>
            <span class="pl-2">{{ currentTitle }}</span>
          </v-card-title>
          <v-card-actions>
            <v-btn
              icon="mdi-close-circle-outline"
              @click="closeDrawer()"
            ></v-btn>
          </v-card-actions>
        </template>

        <!-- <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <v-text-field
                label="Email"
                placeholder="john@google.com"
              ></v-text-field>
              <span class="text-caption text-grey-darken-1">
                This is the email you will use to login to your Vuetify account
              </span>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              <v-text-field
                label="Password"
                type="password"
              ></v-text-field>
              <v-text-field
                label="Confirm Password"
                type="password"
              ></v-text-field>
              <span class="text-caption text-grey-darken-1">
                Please enter a password for your account
              </span>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="3">
            <div class="pa-4 text-center">
              <v-img
                class="mb-4"
                contain
                height="128"
                src="https://cdn.vuetifyjs.com/images/logos/v.svg"
              ></v-img>
              <h3 class="text-h6 font-weight-light mb-2">
                Welcome to Vuetify
              </h3>
              <span class="text-caption text-grey">Thanks for signing up!</span>
            </div>
          </v-window-item>
        </v-window> -->

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            v-if="step > 1"
            variant="text"
            @click="step--"
          >
            Back
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            v-if="step < 3"
            color="light-green"
            variant="flat"
            @click="step++"
          >
            Next
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>
  </v-row>
</template>
<script>

export default {
  components: {
    //
  },
  data: () => ({
    step: 1,
    drawer: false,
    admin: null
  }),
  computed: {
    currentTitle () {
      switch (this.step) {
        case 1: return 'Sign-up'
        case 2: return 'Create a password'
        default: return 'Account created'
      }
    },
  },
  methods: {
    closeDrawer() {
      this.$router.push({ path: "/admin/" + this.admin })
      this.step = 1
    }
  },
  watch: {
    '$route.params': {
      handler: function (params) {
        this.admin = params.admin
        if (params.action) return this.drawer = true
      },
      deep: true,
      immediate: true
    }
  },
}
</script>