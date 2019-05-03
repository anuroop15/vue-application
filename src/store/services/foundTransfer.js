import api from './api'

/**
 * Return a promise of http get all fundsTranfers testing on dev server endpoint
 * @returns {Promise} object represent the api call
 */
export const GetFundsTransfer = () => {
  return api({
    method: "get",
    withCredentials: true,
    baseURL:"http://localhost:3000/",
    url:
      "GetFundsTransfer",
    data: {
      body:
        "status=UNAUTHORISED&status=AUTHORISED&status=CREATED&status=CALL_BACK&status=REJECTED&start=0&count=200"
    }
  });
};
