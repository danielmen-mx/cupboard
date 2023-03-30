import axios from 'axios'
let url = 'http://127.0.0.1:8000/'

export default {
  index(params = []) {
    return axios.get(url + 'api/posts', params)
  },
  store(data) {
    return axios.post(url + 'api/posts', data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
  update(id, data) {
    return axios.put(url + 'api/posts/' + id, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
  remove(id) {
    return axios.delete(url + 'api/posts/' + id)
  }
}