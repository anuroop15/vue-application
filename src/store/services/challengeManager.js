import api from './api'

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
export const ChallengeCheckOTPPhoneChallenge = (urlBase,data) => {
    return api({
      url: `${urlBase}CheckOTPPhoneChallenge`,
      method: "post",
      data: data
    }
    );
  };