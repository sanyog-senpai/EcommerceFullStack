import axios from 'axios'

export const $axios = axios.create({
   baseURL: "http://localhost:8000",
   timeout: 1000,
})

$axios.interceptors.request.use(function (config) {
   // extract accesstoken from localStorage
   const accesstoken = localStorage.getItem("accesstoken")

   // if token, set it to every request
   if (accesstoken) {
      config.headers.Authorization = `Bearer ${accesstoken}`
   }

   return config
})
