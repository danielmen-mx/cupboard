<template>
  <CommentsSkeleton v-if="loading" />
  <template v-else>
    <CommentsEmptyState v-if="items.length < 1" />
    <div v-for="comment in items" :key="comment.id" >
      <div v-if="comment.editing">
        <Edit :comment="comment" />
      </div>
  
      <v-card v-else class="elevation-0 d-flex bg-grey-lighten-4 rounded-xl my-3 mx-3">
        <template class="d-flex align-start pa-3">
          <v-avatar
            color="blue-darken-3"
          >
            <span class="text-h6">{{ initials(comment.user.fullname??comment.user.username) }}</span>
          </v-avatar>
        </template>
        <div>
  
        </div>
        <v-card-text class="pa-2">
          <div
            class="text-subtitle-2 text-decoration-underline"
          >
            <strong>{{ ucFirst(comment.user.fullname??comment.user.username) }}</strong>
          </div>
          <div
            class="text-subtitle-1"
          >
            {{ comment.comment }}
          </div>
        </v-card-text>
        <div v-if="userCanEdit(comment.user.id)" class="d-flex mt-auto mr-4 mb-1" >
          <v-btn
            :disabled="loading"
            size="x-small"
            :ripple="false"
            variant="plain"
            class="text-decoration-underline"
            @click="edit(comment)"
          >
            {{ translate("edit") }}
          </v-btn>
          <v-btn
            :disabled="loading"
            size="x-small"
            :ripple="false"
            variant="plain"
            class="text-decoration-underline"
            @click.stop="requestItemRemoval(comment.id, apiService, event, true, preventSnackbar, preventReload)"
          >
            {{  translate("delete") }}
          </v-btn>
        </div>
      </v-card>
    </div>
  </template>
</template>
<script>
import { initials, ucFirst } from '../../utils/helpers'
import { userCanEdit } from '../../utils/authentication'
import { requestItemRemoval } from '../Common/Helpers/Actions'
import { getModel } from '../Common/Helpers/GetModel'
import Responsive from '../Common/Responsive.vue'
import Table from '../Common/Table.vue'
import Edit from '@/components/Comment/Edit.vue'
import CommentService from '@/services/CommentService'
import CommentsEmptyState from '@/components/Common/EmptyState/CommentsEmptyState.vue'
import CommentsSkeleton from '@/components/Common/Skeletons/CommentsSkeleton.vue'

export default {
  extends: Table,
  mixins: [initials, ucFirst, userCanEdit, requestItemRemoval, getModel],
  components: {
    Edit,
    CommentsEmptyState,
    CommentsSkeleton
  },
  props: {
    model_id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      query: {},
      loading: false,
      apiService: CommentService,
      event: "remove-comment-lenght",
      preventSnackbar: true,
      preventReload: true,
      itemId: null,
      editing: false
    }
  },
  methods: {
    edit(comment) {
      comment.editing = true
    },
    delete(id) {
      this.remove(id)
      this.fireEvent("remove-comment-lenght")
    },
  },
  mounted() {
    if (!this.model_id) this.query.model_id = this.$route.params.id
    if (this.model_id) this.query.model_id = this.model_id
    this.query.model_type = this.getModel()

    this.getItems()
    this.listenEvent('onSubmit', this.addItem)
    this.listenEvent(this.event, this.getItems)
  },
  beforeDestroy() {
    this.unlistenEvent('onSubmit', this.addItem)
    this.unlistenEvent(this.event, this.getItems)
  },
}
</script>