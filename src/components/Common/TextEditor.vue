<template>
  <quill-editor
    v-model:content="description"
    contentType="html"
    :placeholder="placeholder"
    style="height: 50px;"
    class="mb-4"
    theme="snow"
    @keyup="setContent()"
  ></quill-editor>
</template>
<script>
export default {
  props: {
    form_description: {
      // type: String,
      required: true
    }
  },
  data() {
    return {
      placeholder: "Escribe el contenido.",
      description: ''
    }
  },
  methods: {
    setContent() {
      this.form_description = this.description
    }
  },
  mounted() {
    if (!this.form_description) return

    this.description = this.form_description
  },
}
</script>