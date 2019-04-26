import axios from "axios";
import qs from 'qs'

const api = axios.create({
  baseURL: `https://miaecowasdev.mia.usa.sinvest/eco-pre-int-vue/`,
  withCredentials: true,
  headers: {
      Accept: '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'Content-Type': 'application/x-www-form-urlencoded',
      "x-requested-with": "XMLHttpRequest"
  }
});
//X-Requested-With-AXIOS   axios-eco-request
//api.defaults.headers.common['axios-eco-request'] = 'XMLHttpRequest';
/**
 * Return a promise of http get ChallengeInitiate
 * @returns {Promise} object represent the api call
 */
export const ChallengeInitiate = (urlBase, content) => {
  return api({
    url: `${urlBase}Initiate`,
    method: "post",
    data: content,
  });
};
 
/**
 * Return a promise of http get StartChallenge
 * @returns {Promise} object represent the api call
 */
export const ChallengeStart = (urlBase, data) => {

  return api({
      url: `${urlBase}StartChallenge`,
      method: "post",
      data: data
    });
  };

  /**
 * Return a promise of http get CheckOTPPhoneChallenge
 * @returns {Promise} object represent the api call
 */
export const ChallengeCheckOTPPhoneChallenge = (urlBase,token) => {
    return api({
      url: `${urlBase}CheckOTPPhoneChallenge`,
      method: "post",
      data:{'tokenOTP': token}
    }
    );
  };