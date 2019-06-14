import api from "./api";

/**
 * Return a promise of http get Security Preferenece
 * @returns {Promise} object represent the api call
 */
export const GetSecurityPreferences = locale => {
  return api({
    url: `${locale}/preferences/json/GetSecurityPreferences`,
    method: "post"
  });
};

export const GetPhoneCountryPrefixList = locale => {
  return api({
    url: `${locale}/common/json/GetPhoneCountryPrefixList`,
    method: "post"
  });
};

export const GetPreferencesSections = locale => {
  return api({
    url: `${locale}/preferences/json/GetPreferencesSections`,
    method: "post"
  });
};

export const ChangeOwnUserLoginName = (userLoginName, locale) => {
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

export const UnbindDevice = (data, locale) => {
  return api({
    url: `${locale}/preferences/json/UnbindDevice`,
    method: "post",
    data: data
  });
};

export const ValidatePhones = (phones, locale) => {
  return api({
    url: `${locale}/preferences/json/ValidatePhones`,
    method: "post",
    data: phones
  });
};

export const ChangeSiteAuthentication = (data, locale) => {
  return api({
    url: `${locale}/preferences/json/ChangeSiteAuthentication`,
    method: "post",
    data: data
  });
};

export const ChangeOwnPassword = (data, locale) => {
  return api({
    url: `${locale}/preferences/json/ChangeOwnPassword`,
    method: "post",
    data: data
  });
};

export const ChangeSecurityQuestions = (data, locale) => {
  return api({
    url: `${locale}/preferences/json/ChangeSecurityQuestions`,
    method: "post",
    data: data
  });
};

export const SeeSecurityQuestionsSetAnswersVisible = (data, locale) => {
  return api({
    url: `${locale}/preferences/json/SeeSecurityQuestionsSetAnswersVisible`,
    method: "post",
    data: data
  });
};

export const GetEnrollmentInformation = (data, locale) => {
  return api({
    url: `${locale}/preferences/json/GetEnrollmentInformation`,
    method: "post",
    data: data
  });
};

export const GetUserInformation = (locale) => {
  return api({
    url: `${locale}/preferences/json/GetUserInformation`,
    method: "post",
  })
} 

export const ModifyPhoneOperate = (data, locale) =>{
  return api({
    url:`${locale}/preferences/json/ModifyPhoneOperate`,
    method: "post",
    data: data
  })
}