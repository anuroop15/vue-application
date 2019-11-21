import api from './api'

export const isAuthF2 =()=>{
    return JSON.parse(sessionStorage.getItem("banking-f2-apps-context"));
}

export const logClientSideInfo = (logs, isError) => {
    if (isError == undefined) isError = false;
    api({
      url: "/security/json/LogClientSideInformation",
      method: "post",
      data: logs
    });
  };
  