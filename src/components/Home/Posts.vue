<template>
  <div
    v-for="(post, i) in posts"
    :key="post.id"
  >
    <v-row no-gutters v-if="indexPair(i) == true" class="py-6">
      <v-col
        class="pa-2"
        sm="5"
        md="6"
      >
        <v-card>
          <v-img
            :src="post.img"
            lazy-src="/logo/shadai-main.jpeg"
            @click="redirect()"
            height="300"
            cover
            class="cursor-pointer"
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular
                  color="grey-lighten-4"
                  indeterminate
                ></v-progress-circular>
              </div>
            </template>
          </v-img>
        </v-card>
      </v-col>
      <v-col class="text-left">
        <p class="text-h3">{{ post.title }}</p>
        <v-divider></v-divider>
        <p class="text-subtitle-1">{{ post.description }}</p>
      </v-col>
    </v-row>
    <v-row no-gutters v-else>
      <v-col class="text-right">
        <p class="text-h3">{{ post.title }}</p>
        <v-divider></v-divider>
        <p class="text-subtitle-1">{{ post.description }}</p>
      </v-col>
      <v-col
        class="pa-2"
        sm="5"
        md="6"
      >
        <v-card>
          <v-img
            :src="post.img"
            lazy-src="/logo/shadai-main.jpeg"
            @click="redirect()"
            height="300"
            cover
            class="cursor-pointer"
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular
                  color="grey-lighten-4"
                  indeterminate
                ></v-progress-circular>
              </div>
            </template>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <v-divider></v-divider>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="4"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    ></v-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      page: 1,
      posts: [
        {
          id: 1,
          img: "/images/example.jpg",
          title: "tree of the life",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
          id: 2,
          img: "/images/example-1.jpg",
          title: "tree of the wather",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
          id: 3,
          img: "/images/example-2.jpeg",
          title: "someone lossing",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
          id: 4,
          img: null,
          title: "no image",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
          id: 5,
          img: null,
          title: "no image in other side",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
      ]
    }
  },
  methods: {
    indexPair(i) {
      if (Number.isInteger(i / 2)) return true
      return false
    },
    redirect() {
      console.log('redirecting...')
    }
  }
}
</script>