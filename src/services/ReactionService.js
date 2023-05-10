import Api from './api'

export default {
  store(data) {
    return Api.post('/reactions', data)
  },
  update(id, data) {
    return Api.put('/reactions/' + id, data)
  },
}