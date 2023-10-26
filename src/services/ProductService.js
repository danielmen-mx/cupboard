import Api from './api'

export default {
  index(params = []) {
    return Api.get('/products', params)
  },
  store(data) {
    return Api.post('/products', data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
  show(id) {
    return Api.get('/products/' + id)
  },
  update(id, data, headers = null) {
    return Api.post('/products/' + id, data, headers)
  },
  remove(id) {
    return Api.delete('/products/' + id)
  }
}