<template>
  <HomeSkeleton v-if="loading"/>
  <template v-else>
    <HomeEmptyState v-if="items.length < 1" />
    <div v-else>
      <Presentation />
      <v-divider class="mt-1"></v-divider>
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
                      <Ratings parent_class="mx-0 pb-2" :parent_post="post" />
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text >
                      <p class="text-subtitle-1 fill-card">{{ transformText(post.description) }}</p>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions :style="{height: actionHeight}">
                      <Actions parent_class="justify-self-end fix-height" :parent_post="post" />
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
                      <Ratings parent_class="mx-0 pb-2 d-flex flex-row-reverse" :parent_post="post" />
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                      <p class="text-subtitle-1 text-right fill-card" >
                        {{ transformText(post.description) }}
                      </p>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions :style="{height: actionHeight}">
                      <Actions parent_class="justify-self-end" :parent_post="post" />
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
import HomePagination from '../Common/Paginations/Home.vue'
import Actions from './Actions.vue'
import Ratings from './Ratings.vue'
import { findItemById, indexPair } from '../../utils/helpers'

export default {
  mixins: [Table, findItemById, indexPair],
  extends: ResponsivePosts,
  inject: ['strLimit'],
  components: {
    Presentation,
    HomeSkeleton,
    HomeEmptyState,
    HomePagination,
    Actions,
    Ratings
  },
  data() {
    return {
      loading: false,
      apiService: PostService,
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
    redirect(id, focusCommentInput = false) {
      this.$router.push({ path: '/post/' + id })

      if (!focusCommentInput) return

      this.$nextTick(() => {
        this.fireEvent('focus-comment-input')
      })
    },
    transformText(text) {
      let newText = text.replace(/(<([^>]+)>)/ig, '')
      return this.strLimit(newText, this.words)
    },
    updatePagination(properties) {
      if (this.query.per_page === properties.per_page && this.query.page === properties.page) return
      this.query = properties
      this.getItems()
    },
    updatePost(resp) {
      let newObj = []
      let match = this.findItemById(this.items, resp.id)

      if (match) {
        newObj = this.items.map(function (item) {
          if (item.id === resp.id) {
            return resp
          }
  
          return item
        })
      } else {
        newObj.push(resp)
      }

      this.items = newObj
    },
    postReactions(reactions) {
      let num = 0
      reactions.map(reaction => {
        if (reaction.reaction === true) num++
      })

      return num
    },
  },
  computed: {
    
  },
  mounted() {
    this.getItems()
    this.listenEvent('update-reactions', this.updatePost)
    this.listenEvent('update-home-pagination-table', this.updatePagination)
  },
}
</script>
<style>
  .fill-card {
    height: 112px;
  }
</style>