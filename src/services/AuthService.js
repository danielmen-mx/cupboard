import ResetPassword from '../components/Login/ResetPassword.vue'
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
  },
  forgotPassword(data) {
    return Api.post('/forgot-password', data)
  },
  resetPassword(data) {
    return Api.post('/reset-password', data)
  }
}