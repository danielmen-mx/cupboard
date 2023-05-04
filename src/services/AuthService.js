import Api from './api'

export default {
  login(data) {
    return Api.post('/login', data)
  },
  register(data) {
    return Api.post('/register', data)
  },
  logout(data) {
    return Api.post('/logout', data)
  }
}