import Api from './api'

export default {
  index(params) {
    return Api.get('/comments', params)
  },
  store(data) {
    return Api.post('/comments', data)
  },
  show(id) {
    return Api.get('/comments/' + id)
  },
  update(id, data) {
    return Api.put('/comments/' + id, data)
  },
  remove(id) {
    return Api.delete('/comments/' + id)
  }
}