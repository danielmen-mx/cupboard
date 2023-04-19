<template>
  <div v-if="items.length == 0" >
    <!-- <v-skeleton-loader color="info" type="card"></v-skeleton-loader> -->
    <v-parallax
      height="600"
      lazy-src="/logo/shadai-main.jpeg"
      class="grayscale"
    >
      <div v-if="loading" class="d-flex align-center justify-center fill-height">
        <v-progress-circular
          color="grey-lighten-4"
          indeterminate
          size="109"
          width="11"
        ></v-progress-circular>
      </div>
      <div 
        v-else
        class="d-flex flex-column fill-height justify-center align-left"
      >
        <div class="text-pink-lighten-1 rounded px-8">
          <!-- <p>🐶🐶🐶</p> -->
          <br>
          <h1 class="text-h4 font-weight-thin mb-4">
            Seguimos trabajando
          </h1>
          <h4 class="subheading">
            Hoy no tenemos publicaciones recientes!
          </h4>
        </div>
      </div>
    </v-parallax>
  </div>
  <div v-else>
    <div
      v-for="(post, i) in items"
      :key="post.id"
      v-resize="onResize"
    >
      <v-row no-gutters v-if="indexPair(i) == true" class="py-2">
        <v-col
          class="mr-2"
          sm="5"
          md="6"
        >
          <v-card width="auto">
            <v-img
              :src="post.image"
              lazy-src="/logo/shadai-main.jpeg"
              @click="redirect(post.id)"
              height="320"
              cover
              class="cursor-pointer w-auto"
            >
              <template v-slot:placeholder>
                <div 
                  class="d-flex align-center justify-center fill-height"
                ></div>
              </template>
            </v-img>
          </v-card>
        </v-col>
        <v-col>
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-card
                class="elevation-2 pa-3"
                v-bind="props"
                :color="isHovering ? 'light-green' : undefined"
                height="320"
                width="auto"
              >
                <v-card-title>
                  <p
                    :class="titleText"
                    class="text-left pb-3"
                  >
                    {{ strLimit(post.name, postNameText) }}
                  </p>
                  <v-row
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
                      {{ post.rating }} ({{ post.reaction }})
                    </div>
                  </v-row>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text >
                  <p class="text-subtitle-1 fill-card">{{ limitText(post.description) }}</p>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions :style="{height: actionHeight}">
                  <v-list-item class="w-100">
                    <template v-slot:prepend>
                      <v-avatar
                        color="pink-lighten-1"
                      >
                        <span class="text-h5">{{ initials(post.autor) }}</span>
                      </v-avatar>
                    </template>
  
                    <v-list-item-title>{{ post.autor }}</v-list-item-title>
  
                    <v-list-item-subtitle>Autor</v-list-item-subtitle>
  
                    <template v-slot:append>
                      <div class="justify-self-end fix-height">
                        <v-icon class="me-1" icon="mdi-heart" color="red" @click="addReaction(post)"></v-icon>
                        <span class="subheading me-2">{{ post.reaction }}</span>
                        <span class="me-1">·</span>
                        <v-icon class="me-1" icon="mdi-comment" color="blue" @click="redirect(post.id)"></v-icon>
                        <span class="subheading">{{ post.comments }}</span>
                      </div>
                    </template>
                  </v-list-item>
                </v-card-actions>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
  
      <v-row no-gutters v-else class="py-2">
        <v-col>
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-card
                class="elevation-2 pa-3"
                v-bind="props"
                :color="isHovering ? 'light-green' : undefined"
                height="320"
                width="auto"
              >
                <v-card-title>
                  <p
                    :class="titleText"
                    class="text-right pb-3"
                  >
                    {{ strLimit(post.name, postNameText) }}
                  </p>
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
                      {{ post.rating }} ({{ post.reaction }})
                    </div>
                  </v-row>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <p
                    class="text-subtitle-1 text-right fill-card"
                  >
                    {{ limitText(post.description) }}
                  </p>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions :style="{height: actionHeight}">
                  <v-list-item class="w-100">
                    <template v-slot:prepend>
                      <v-avatar
                        color="orange-darken-4"
                      >
                        <span class="text-h5">{{ initials(post.autor) }}</span>
                      </v-avatar>
                    </template>
  
                    <v-list-item-title>{{ post.autor }}</v-list-item-title>
  
                    <v-list-item-subtitle>Autor</v-list-item-subtitle>
  
                    <template v-slot:append>
                      <div class="justify-self-end">
                        <v-icon class="me-1" icon="mdi-heart" color="red" @click="addReaction(post)"></v-icon>
                        <span class="subheading me-2">{{ post.reaction }}</span>
                        <span class="me-1">·</span>
                        <v-icon class="me-1" icon="mdi-comment" color="blue" @click="redirect(post.id)"></v-icon>
                        <span class="subheading">{{ post.comments }}</span>
                      </div>
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
          <v-card width="auto">
            <v-img
              :src="post.image"
              lazy-src="/logo/shadai-main.jpeg"
              @click="redirect(post.id)"
              height="320"
              cover
              class="cursor-pointer w-auto"
            >
              <template v-slot:placeholder>
                <div 
                  class="d-flex align-center justify-center fill-height"
                ></div>
              </template>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-divider></v-divider>
    <!-- TODO: connect pagination with API -->
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="4"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
    </div>
  </div>
</template>
<script>
import PostService from '@/services/PostService.js'
import ResponsivePosts from '@/components/Common/Responsives/posts.vue'
import { initials } from '../../utils/helpers'

export default {
  mixins: [initials],
  extends: ResponsivePosts,
  inject:['strLimit'],
  data() {
    return {
      loading: false,
      apiService: PostService,
      chance: 1,
      page: 1,
      items: [],
    }
  },
  methods: {
    indexPair(i) {
      if (Number.isInteger(i / 2)) return true
      return false
    },
    redirect(id) {
      this.$router.push({path: '/post/' + id})
    },
    async getItems() {
      try {
        this.loading = true

        const resp = await this.apiService.index()

        this.items = resp.data.data
        this.loading = false
      } catch (error) {
        console.log(error)
      }
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
      return this.strLimit(text, this.words)
    }
  },
  mounted() {
    this.getItems()
  },
}
</script>
<style>
  .fill-card {
    height: 112px;
  }
</style>