import axios from "axios";

const api = axios.create({
  baseURL: `https://miaecowasdev.mia.usa.sinvest/eco-pre-int-vue/`,
  withCredentials: true,
  headers: {
    Accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/x-www-form-urlencoded",
    "x-requested-with": "XMLHttpRequest"
  }
});

/**
 * Return a promise of http get Security Preferenece
 * @returns {Promise} object represent the api call
 */
export const GetSecurityPreferences = () => {
  return api({
    url: "/preferences/json/GetSecurityPreferences",
    method: "post"
  });
};

export const GetPhoneCountryPrefixList = () => {
  return api({
    url: "/common/json/GetPhoneCountryPrefixList",
    method: "post"
  });
};

export const ChangeOwnUserLoginName = userLoginName => {
  return api({
    url: "/preferences/json/ChangeOwnUserLoginName",
    method: "post",
    data: `event.userLoginName=${userLoginName}&${CSRFToken}`
  });
};

export const ChangeOwnDisplayName = displayName => {
  return api({
    url: "/preferences/json/ChangeOwnDisplayName",
    method: "post",
    data: `event.displayName=${displayName}&${CSRFToken}`
  });
};

export const UnbindDevice = deviceLabel => {
  return api({
    url: "/preferences/json/UnbindDevice",
    method: "post",
    data: `deviceLabel=${deviceLabel}`
  });
};