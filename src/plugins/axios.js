"use strict";

import Vue from 'vue'
import axios from "axios"

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = import.meta.env.baseURL || import.meta.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: import.meta.env.baseURL || import.meta.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control

};

const _axios = axios.create(config);

_axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
// if(import.meta.env.VUE_APP_API_ENDPOINT) {
// _axios.defaults.baseURL = import.meta.env.VUE_APP_API_ENDPOINT
// }
_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // config.headers.Accept = 'application/json'
    // config.headers.Authorization = 'Bearer ' + result.token
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

Plugin.install = function (Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
