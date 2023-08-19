<template>
  <HomeSkeleton v-if="loading"/>
  <template v-else>
    <HomeEmptyState v-if="items.length < 1" />
    <div v-else>
      <Presentation />
      <v-divider class="mt-1"></v-divider>
      <!-- <v-skeleton-loader type="card-avatar"></v-skeleton-loader> -->
      <v-card class="elevation-0">
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
                      <v-row class="mx-0 pb-2" >
                        <v-rating
                          :model-value="post.rating"
                          color="amber"
                          density="compact"
                          half-increments
                          readonly
                          size="small"
                        ></v-rating>
                        <div class="text-grey ms-4">
                          {{ post.rating }} stars ({{ post.reactions.length }} reactions)
                        </div>
                      </v-row>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text >
                      <p class="text-subtitle-1 fill-card">{{ transformText(post.description) }}</p>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions :style="{height: actionHeight}">
                      <v-list-item class="w-100">
                        <template v-slot:prepend>
                          <v-avatar color="pink-lighten-1" >
                            <span class="text-h5">{{ initials(post.autor) }}</span>
                          </v-avatar>
                        </template>
                        <v-list-item-title>
                          {{ post.autor }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          Autor
                        </v-list-item-subtitle>
                        <template v-slot:append>
                          <div class="justify-self-end fix-height">
                            <v-icon class="me-1" icon="mdi-heart" color="red" @click="addReaction(post)"></v-icon>
                            <span class="subheading me-2">{{ post.reactions.length }}</span>
                            <span class="me-1">·</span>
                            <v-icon class="me-1" icon="mdi-comment" color="blue" @click="redirect(post.id, true)"></v-icon>
                            <span class="subheading">{{ post.comments.length }}</span>
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
                          {{ post.rating }} stars ({{ post.reactions.length }} reactions)
                        </div>
                      </v-row>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                      <p class="text-subtitle-1 text-right fill-card" >
                        {{ transformText(post.description) }}
                      </p>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions :style="{height: actionHeight}">
                      <v-list-item class="w-100">
                        <template v-slot:prepend>
                          <v-avatar color="orange-darken-4" >
                            <span class="text-h5">{{ initials(post.autor) }}</span>
                          </v-avatar>
                        </template>
                        <v-list-item-title>{{ post.autor }}</v-list-item-title>
                        <v-list-item-subtitle>Autor</v-list-item-subtitle>
                        <template v-slot:append>
                          <div class="justify-self-end">
                            <v-icon class="me-1" icon="mdi-heart" color="red" @click="addReaction(post)"></v-icon>
                            <span class="subheading me-2">{{ post.reactions.length }}</span>
                            <span class="me-1">·</span>
                            <v-icon class="me-1" icon="mdi-comment" color="blue" @click="redirect(post.id, true)"></v-icon>
                            <span class="subheading">{{ post.comments.length }}</span>
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
        <div class="text-center">
          <HomePagination :pagination_values="paginationProps" :per_page="query" />
        </div>
      </v-card>
    </div>
  </template>
</template>
<script>
import PostService from '@/services/PostService.js'
import ResponsivePosts from '@/components/Common/Responsives/posts.vue'
import Table from '../Common/Table.vue'
import Presentation from './Presentation.vue'
import HomeSkeleton from '@/components/Common/Skeletons/HomeSkeleton.vue'
import HomeEmptyState from '../Common/EmptyState/HomeEmptyState.vue'
import HomePagination from '../Common/HomePagination.vue'
import { initials } from '../../utils/helpers'

export default {
  mixins: [initials, Table],
  extends: ResponsivePosts,
  inject: ['strLimit'],
  components: {
    Presentation,
    HomeSkeleton,
    HomeEmptyState,
    HomePagination
  },
  data() {
    return {
      loading: false,
      apiService: PostService,
      chance: 1,
      items: [],
      configuration: {},
      preventSnackbar: true,
      query: {
        per_page: 15,
        page: 1
      }
    }
  },
  methods: {
    indexPair(i) {
      if (Number.isInteger(i / 2)) return true
      return false
    },
    redirect(id, focusCommentInput = false) {
      this.$router.push({ path: '/post/' + id })

      if (!focusCommentInput) return

      this.$nextTick(() => {
        this.fireEvent('focus-comment-input')
      })
    },
    async addReaction(post) {
      // let react = await axios.post()

      // if (this.chance > 0) {
      //   this.chance = 0
      //   return post.reaction = post.reaction + 1
      // }

      // this.chance = 1
      // return post.reaction = post.reaction - 1

      // post.reaction doesn't exists anymore, you need to improve the "add reaction button" adding the user who is reacting to this post
      // send the user && the reaction
    },
    transformText(text) {
      let newText = text.replace(/(<([^>]+)>)/ig, '')
      return this.strLimit(newText, this.words)
    },
    updatePagination(properties) {
      if (this.query.per_page === properties.per_page && this.query.page === properties.page) return
      this.query = properties
      this.getItems()
    }
  },
  mounted() {
    this.getItems()
    this.listenEvent('updateHomePaginationTable', this.updatePagination)
  },
}
</script>
<style>
  .fill-card {
    height: 112px;
  }
</style>