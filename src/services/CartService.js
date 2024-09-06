import Api from './api'

export default {
  index(params = []) {
    return Api.get('/carts', params)
  },
  store(data) {
    return Api.post('/carts', data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
  show(id) {
    return Api.get('/carts/' + id)
  },
  update(id, data, headers = null) {
    return Api.put('/carts/' + id, data, headers)
  },
  remove(id) {
    return Api.delete('/carts/' + id)
  }
}