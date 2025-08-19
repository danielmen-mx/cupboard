<template>
  <v-card class="mx-auto pa-2 ma-2 elevation-0">
    <template class="d-flex justify-space-between">
      <v-card-title class="text-h6 font-weight-regular justify-space-between">
        <span>User Information</span>
      </v-card-title>
      <v-card-actions>
        <v-btn
          icon="mdi-close-circle-outline"
          @click="closeDrawer()"
        ></v-btn>
      </v-card-actions>
    </template>
    <v-card class="p-3 rounded-2xl shadow-lg max-w-lg mx-auto">
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="form.username"
            label="Username"
            variant="outlined"
            density="comfortable"
            readonly
            required
          />
          <v-text-field
            v-model="form.email"
            label="Email"
            type="email"
            variant="outlined"
            density="comfortable"
            readonly
            required
          />
          <v-text-field
            v-model="form.first_name"
            label="First Name"
            variant="outlined"
            density="comfortable"
            readonly
          />
          <v-text-field
            v-model="form.last_name"
            label="Second Name"
            variant="outlined"
            density="comfortable"
            readonly
          />
          <v-select
            v-model="form.language"
            item-title="title"
            item-value="value"
            label="Language"
            variant="outlined"
            density="comfortable"
            readonly
          />
          <v-switch
            v-model="form.is_admin"
            label="Is Admin"
            color="light-green"
            :true-value="1"
            :false-value="0"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!enableSubmit"
          color="green"
          variant="flat"
          @click.prevent="submit"
        >
          {{ translate("save") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>
<script>
import UserService from '@/services/UserService'
import Form from '../../Common/Form.vue'
import required from '../../Common/Form.vue'
import TextEditor from '../../Common/TextEditor.vue'
import { copyData, slugify } from '../../../utils/helpers'

export default {
  extends: Form,
  mixins: [required, copyData, slugify],
  components: {
    TextEditor
  },
  props: {
    item_parent: {
      type: Object,
      required: false,
    }
  },
  data() {
    return {
      apiService: UserService,
      enableSubmit: false,
      form: {
        username: null,
        email: null,
        first_name: null,
        last_name: null,
        language: null,
        is_admin: null
      },
      itemId: null,
      loading: false,
      search: null,
      event: 'updateUserAdminTable'
    }
  },
  methods: {
    closeDrawer() {
      this.itemId = null,
      this.form = {
        username: null,
        email: null,
        first_name: null,
        last_name: null,
        language: null,
        is_admin: null
      }

      this.$nextTick(() => { this.$router.push({ path: "/admin/users" }) })
    }
  },
  mounted() {
    if (!this.item_parent) return
    let itemBackup = this.copyData(this.item_parent);
    this.form = itemBackup;
    this.itemId = itemBackup.id;
    console.log(this.form.is_admin);
  },
  watch: {
    // 'form.name': {
    //   handler: function () {
    //     if (this.validateStepOne()) return this.enableNextButton = true
    //     return this.enableNextButton = false
    //   },
    //   deep: true,
    //   immediate: true
    // },
  }
}
</script>