import axios from "axios"
import Cookies from "js-cookie"

const baseURL = "http://127.0.0.1:8000/api"
// const baseURL = "/api"
// webunderdevelopment.com

var headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-Requested-With": "XMLHttpRequest",
}

const options = {
  headers,
  baseURL,
}

const Axios = axios.create(options)

Axios.interceptors.request.use(
  function (config) {
    const tokenStore = JSON.parse(localStorage.getItem("wu-user-token"))

    if (tokenStore) {
      config.headers.Accept = "application/json"
      config.headers.Authorization = "Bearer " + tokenStore.token
    }

    const ttoken = Cookies.get("ttoken") || false

    if (ttoken) {
      config.headers.Accept = "application/json"
      config.headers['X-TToken'] = ttoken
    }

    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
)

Axios.interceptors.response.use(
  function (response) {
    return response.data
  },

  function (error) {
    if (error.response) {
      if (error.response.data.message == 'Unauthenticated.') {
        localStorage.removeItem("wu-user-token")
        localStorage.removeItem("wu-admin-user")
        window.location.replace('/login')
        return null
      }
      return Promise.reject(error.response.data)
    } else {
      return Promise.reject(error)
    }
  }
)

export default Axios

export const imageHeaders = {
  methods: {
    imageHeaders() {
      return {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    }
  }
}