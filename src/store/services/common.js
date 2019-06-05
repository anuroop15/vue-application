import api from './api'

export const isAuthF2 =()=>{
    return sessionStorage.getItem("santander-f2-apps-access-token");
}

export const logClientSideInfo = (logs, isError) => {
    if (isError == undefined) isError = false;
    api({
      url: "/security/json/LogClientSideInformation",
      method: "post",
      data: logs
    });
  };
  