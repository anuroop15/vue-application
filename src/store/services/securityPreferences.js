import api from './api'

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
    data: `event.userLoginName=${userLoginName}&`
  });
};

export const ChangeOwnDisplayName = displayName => {
  return api({
    url: "/preferences/json/ChangeOwnDisplayName",
    method: "post",
    data: `event.displayName=${displayName}&`
  });
};

export const UnbindDevice = deviceLabel => {
  return api({
    url: "/preferences/json/UnbindDevice",
    method: "post",
    data: `deviceLabel=${deviceLabel}`
  });
};


export const ValidatePhones = phones => {
  return api({
    url: "/preferences/json/ValidatePhones",
    method: "post",
    data: phones
  });
};