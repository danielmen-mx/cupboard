import axios from 'axios'
let url = 'http://127.0.0.1:8000/api/'

export default {
  index(params = []) {
    return axios.get(url + 'posts', params)
  },
  store(data) {
    return axios.post(url + 'posts', data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
  show(id) {
    return axios.get(url + 'posts/' + id)
  },
  update(id, data, headers = null) {
    return axios.post(url + 'posts/' + id, data, headers)
  },
  remove(id) {
    return axios.delete(url + 'posts/' + id)
  }
}