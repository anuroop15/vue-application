import api from './api'

/**
 * Return a promise of http get Security Preferenece
 * @returns {Promise} object represent the api call
 */
export const GetSecurityPreferences = (locale) => {
  return api({
    url: `${locale}/preferences/json/GetSecurityPreferences`,
    method: "post"
  });
};

export const GetPhoneCountryPrefixList = (locale) => {
  return api({
    url: `${locale}/common/json/GetPhoneCountryPrefixList`,
    method: "post"
  });
};

export const ChangeOwnUserLoginName = (userLoginName ,locale )=> {
  return api({
    url: `${locale}/preferences/json/ChangeOwnUserLoginName`,
    method: "post",
    data: `event.userLoginName=${userLoginName}&`
  });
};

export const ChangeOwnDisplayName = (displayName, locale) => {
  return api({
    url: `${locale}/preferences/json/ChangeOwnDisplayName`,
    method: "post",
    data: `event.displayName=${displayName}&`
  });
};

export const UnbindDevice = ({label, devicePrint},locale) => {
  return api({
    url: `${locale}/preferences/json/UnbindDevice`,
    method: "post",
    data: `deviceLabel=${label}&devicePrint=${devicePrint}`
  });
};


export const ValidatePhones = (phones, locale) => {
  return api({
    url: `${locale}/preferences/json/ValidatePhones`,
    method: "post",
    data: phones
  });
};