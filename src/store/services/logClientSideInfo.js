import axios from "axios";
// const api = axios.create({
//   baseURL: `https://miaecowasdev.mia.usa.sinvest/eco-pre-int-vue/`,
//   withCredentials: true,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json"
//   }
// });

export const logClientSideInfo = (logs, isError) => {
  if (isError == undefined) isError = false;
  // api({
  //   url: "security/json/LogClientSideInformation",
  //   method: "post",
  //   data: { data: logs, error: isError }
  // });
};
