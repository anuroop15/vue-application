import axios from "axios";

const apiClientExample = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

/**
 * Return a promise of http get all fundsTranfers
 * @returns {Promise} object represent the api call
 */
export const GetFundsTransfer = () => {
  return apiClientExample.get("/GetFundsTransfer");
};

/**
 * Return a promise of http get all fundsTranfers testing on dev server endpoint
 * @returns {Promise} object represent the api call
 */
export const GetFundsTransferTest = () => {
  return axios({
    method: "post",
    withCredentials: true,
    url:
      "https://miaecowasdev.mia.usa.sinvest/eco-pre-int/en/customer/json/GetFundsTransfers",
    data: {
      body:
        "status=UNAUTHORISED&status=AUTHORISED&status=CREATED&status=CALL_BACK&status=REJECTED&start=0&count=200"
    }
  });
};
