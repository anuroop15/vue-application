import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
  headers: {
    Accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/x-www-form-urlencoded",
    "x-requested-with": "XMLHttpRequest"
  }
});

api.interceptors.request.use( config =>{
  let token = sessionStorage.getItem("santander-f2-apps-access-token");
  if(token){
    config.headers.authorization =`Bearer ${token}`
  }
  return config
}, err =>{
  return Promise.reject(err)
})

export default api;
