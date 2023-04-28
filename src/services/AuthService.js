import axios from 'axios'
let url = 'http://127.0.0.1:8000/api/'

export default {
  login(data) {
    return axios.post(url + 'login', data)
  },
  register(id) {
    return axios.get(url + 'posts/' + id)
  },
}