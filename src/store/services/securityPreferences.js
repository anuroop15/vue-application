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

//test CSRF token
const token ="&8fce9eb97eb94996b19a2b06f1b291a7=e92ad394-a595-4e68-b5d3-2d9be01370dc"

export const ChangeSiteAuthentication = (data, locale)=>{
  data += token
  return api({
    url:`${locale}/preferences/json/ChangeSiteAuthentication`,
    method:"post",
    data:data
  })
}

export const ChangeOwnPassword = (data, locale)=>{
  data += token
  return api({
    url:`${locale}/preferences/json/ChangeOwnPassword`,
    method:"post",
    data:data
  })
}

export const ChangeSecurityQuestions = (data, locale) =>{
  data += token
  return api({
    url:`${locale}/preferences/json/ChangeSecurityQuestions`,
    method:"post",
    data:data
  })
}

 export const SeeSecurityQuestionsSetAnswersVisible = (data, locale) =>{
  data += token
  return api({
    url:`${locale}/preferences/json/SeeSecurityQuestionsSetAnswersVisible`,
    method:"post",
    data:data
  })
 }

export const GetEnrollmentInformation = (data, locale) =>{
  data += token
  return api({
    url:`${locale}/security/json/GetEnrollmentInformation`,
    method:"post",
    data:data
  })
}