<template>
  <v-card v-if="this.user" class="mx-auto pa-2 ma-2 elevation-0">
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
            :readonly="enableSwitch"
            :disabled="canEdit"
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
          @click.prevent="validateSubmit()"
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
import store from '@/store'
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
      required: true,
    }
  },
  data() {
    return {
      apiService: UserService,
      enableSubmit: false,
      user: null,
      itemBackup: null,
      form: {
        username: null,
        email: null,
        first_name: null,
        last_name: null,
        language: null,
        is_admin: null,
        is_landlord: null
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
      this.user = null
      this.itemBackup = null,
      this.form = {
        username: null,
        email: null,
        first_name: null,
        last_name: null,
        language: null,
        is_admin: null,
        is_landlord: null
      }

      this.$nextTick(() => { this.$router.push({ path: "/admin/users" }) })
    },
    validateSubmit() {
      this.form.username = null;
      this.form.email = null;
      this.form.is_landlord = null;
      this.submit();
    },
    async submit() {
      if (!this.form) return

      try {
        this.loading = true
        let resp = null

        resp = await this.apiService.switchAdmin(this.itemId, this.form);

        if (!this.preventSnackbar) {
          this.successSnackbar(resp.message)
        }

        if (!this.preventUpdateItems) {
          this.fireEvent(this.event, resp.data)
        }

        this.form = resp.data;
        // this.item_parent = resp.data;
        this.fireEvent(this.event, resp.data)
        this.successCallBack(resp.data)
        this.closeDrawer();
      } catch (error) {
        console.log(error)
        if (error.exception) this.errorSnackbar(error.exception)
      }

      this.loading = false
    },
  },
  computed: {
    enableSwitch() {
      return this.user && this.user.is_landlord == 1 ? false : true;
    },
    canEdit() {
      return this.form && this.form.is_landlord == 1 ? true : false;
    }
  },
  mounted() {
    if (!this.item_parent) return
    this.user = store.getters['user']
    this.itemBackup = this.copyData(this.item_parent);
    this.form = this.itemBackup;
    this.itemId = this.user.id;
  },
  watch: {
    'form': {
      handler: function () {
        if (this.item_parent && this.item_parent.is_admin !== this.form.is_admin) return this.enableSubmit = true
        return this.enableSubmit = false
      },
      deep: true,
      immediate: true
    },
  }
}
</script>