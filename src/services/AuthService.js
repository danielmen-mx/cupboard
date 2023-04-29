import Api from './api'

export default {
  login(data) {
    return Api.post('/login', data)
  },
  register(data) {
    // return Api.get('/register' + id)
  },
}