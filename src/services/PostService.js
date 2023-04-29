import Api from './api'

export default {
  index(params = []) {
    return Api.get('/posts', params)
  },
  store(data) {
    return Api.post('/posts', data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
  show(id) {
    return Api.get('/posts/' + id)
  },
  update(id, data, headers = null) {
    return Api.post('/posts/' + id, data, headers)
  },
  remove(id) {
    return Api.delete('/posts/' + id)
  }
}