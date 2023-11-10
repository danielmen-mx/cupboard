<template></template>
<script>
export default {
  data() {
    return {
      form: {},
      loading: false,
      apiService: null,
      formComplete: false,
      image_stored: null,
      base_tags: [
        this.translate("admin.posts.tag-list.release"),
        this.translate("admin.posts.tag-list.update"),
        this.translate("admin.posts.tag-list.overwrite")
      ],
      search: null,
      event: null
    }
  },
}
</script>