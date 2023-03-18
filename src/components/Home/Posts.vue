<template>
  <div
    v-for="(post, i) in posts"
    :key="post.id"
  >
    <v-row no-gutters v-if="indexPair(i) == true" class="py-6">
      <v-col
        class="mr-2"
        sm="5"
        md="6"
      >
        <v-card>
          <v-img
            :src="post.img"
            lazy-src="/logo/shadai-main.jpeg"
            @click="redirect(post.id)"
            height="320"
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
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card
              class="elevation-2 pa-3"
              v-bind="props"
              :color="isHovering ? 'light-green' : undefined"
              height="320"
            >
              <v-card-title>
                <p class="text-h3 pb-3">{{ post.title }}</p>
                <v-row
                  align="center"
                  class="mx-0 pb-2"
                >
                  <v-rating
                    :model-value="post.rating"
                    color="amber"
                    density="compact"
                    half-increments
                    readonly
                    size="small"
                  ></v-rating>
  
                  <div class="text-grey ms-4">
                    4.5 (413)
                  </div>
                </v-row>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <p class="text-subtitle-1">{{ limitText(post.description) }}</p>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-list-item class="w-100">
                  <template v-slot:append>
                    <div class="justify-self-end">
                      <v-btn icon>
                        <v-badge :content="post.reaction" color="blue-lighten-5">
                          <v-icon size="large" icon="mdi-heart" color="red" @click="addReaction(post)"></v-icon>
                        </v-badge>
                      </v-btn>
                    </div>
                    <v-btn icon>
                      <v-badge :content="post.comments" color="blue-lighten-5">
                        <v-icon size="large" icon="mdi-comment" color="blue" @click="redirect(post.id)"></v-icon>
                      </v-badge>
                    </v-btn>
                  </template>
                </v-list-item>
              </v-card-actions>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>

    <v-row no-gutters v-else>
      <v-col class="text-right">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card
              class="elevation-2 pa-3"
              v-bind="props"
              :color="isHovering ? 'light-green' : undefined"
              height="320"
            >
              <v-card-title>
                <p class="text-h3 pb-3">{{ post.title }}</p>
                <v-row
                  class="mx-0 pb-2 d-flex flex-row-reverse"
                >
                  <v-rating
                    :model-value="post.rating"
                    color="amber"
                    density="compact"
                    half-increments
                    readonly
                    size="small"
                  ></v-rating>
  
                  <div class="text-grey ms-4">
                    4.5 (413)
                  </div>
                </v-row>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <p class="text-subtitle-1">{{ limitText(post.description) }}</p>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-list-item class="w-100">
                  <template v-slot:append>
                    <div class="justify-self-end">
                      <v-btn icon>
                        <v-badge :content="post.reaction" color="blue-lighten-5">
                          <v-icon size="large" icon="mdi-heart" color="red" @click="addReaction(post)"></v-icon>
                        </v-badge>
                      </v-btn>
                    </div>
                    <v-btn icon>
                      <v-badge :content="post.comments" color="blue-lighten-5">
                        <v-icon size="large" icon="mdi-comment" color="blue" @click="redirect(post.id)"></v-icon>
                      </v-badge>
                    </v-btn>
                  </template>
                </v-list-item>
              </v-card-actions>
            </v-card>
          </template>
        </v-hover>
      </v-col>
      <v-col
        class="ml-2"
        sm="5"
        md="6"
      >
        <v-card>
          <v-img
            :src="post.img"
            lazy-src="/logo/shadai-main.jpeg"
            @click="redirect(post.id)"
            height="320"
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
  inject:['strLimit'],
  data() {
    return {
      chance: 1,
      page: 1,
      posts: [
        {
          id: 1,
          img: "/images/example.jpg",
          title: "tree of the life",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          rating: 3.5,
          reaction: 1,
          comments: 0
        },
        {
          id: 2,
          img: "/images/example-1.jpg",
          title: "tree of the wather",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
          rating: 4,
          reaction: 3,
          comments: 10
        },
        {
          id: 3,
          img: "/images/example-2.jpeg",
          title: "someone lossing",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          rating: 1,
          reaction: 5,
          comments: 74
        },
        {
          id: 4,
          img: null,
          title: "no image",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          rating: 3.5,
          reaction: 0,
          comments: 6
        },
        {
          id: 5,
          img: null,
          title: "no image in other side",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          rating: 4.5,
          reaction: 10,
          comments: 23
        },
      ]
    }
  },
  methods: {
    indexPair(i) {
      if (Number.isInteger(i / 2)) return true
      return false
    },
    redirect(id) {
      console.log('redirecting to id...' + id)
    },
    async addReaction(post) {
      // let react = await axios.post()

      if (this.chance > 0) {
        this.chance = 0
        return post.reaction = post.reaction + 1
      }

      this.chance = 1
      return post.reaction = post.reaction - 1
    },
    limitText(text) {
      return this.strLimit(text, 270)
    }
  }
}
</script>