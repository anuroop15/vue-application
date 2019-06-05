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

export const ChangeSiteAuthentication = (data, locale)=>{
  return api({
    url:`${locale}/preferences/json/ChangeSiteAuthentication`,
    method:"post",
    data:data
  })
}

export const GetEnrollmentInformation = (data, locale) =>{
  data += '&6d82538337fa4041bbe902d7753e4f6d=86dad655-7ba8-4e2f-b643-c3b00e655faa'
  return api({
    url:`${locale}/security/json/GetEnrollmentInformation`,
    method:"post",
    data:data
  })
}