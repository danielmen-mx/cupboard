import Api from './api'

export default {
  index(params = []) {
    return Api.get('/users', params)
  },
  show(id) {
    return Api.get('/users/' + id)
  },
  update(id, data, headers = null) {
    return Api.put('/users/' + id, data, headers)
  },
  remove(id) {
    return Api.delete('/users/' + id)
  },
  validateUsername(id, data) {
    return Api.get('/users/' + id + '/validate-username', data)
  },
  validateEmail(id, data) {
    return Api.get('/users/' + id + '/validate-email', data)
  },
  changePassword(id, data) {
    return Api.put('/users/' + id + '/change-password', data)
  },
  switchAdmin(id, data) {
    return Api.put('/users/' + id + '/switch-admin', data)
  },
  removeUser(id, data) {
    return Api.put('/users/' + id + '/remove-user', data)
  }
}