import axios from "axios";

export default axios.create({
  baseURL: `https://miaecowasdev.mia.usa.sinvest/eco-pre-int-vue/`,
  withCredentials: true,
  headers: {
    Accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/x-www-form-urlencoded",
    "x-requested-with": "XMLHttpRequest"
  }
});
