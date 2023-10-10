const postModel = "App\\Models\\Cupboard\\Post"
const productModel = "App\\Models\\Cupboard\\Product"

export const getModel = {
  methods: {
    getModel() {
      if (this.$route.name === 'post') return postModel
      return productModel
    }
  },
}