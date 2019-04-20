import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

/**
 * Return a promise of http get Security Preferenece
 * @returns {Promise} object represent the api call
 */
export const GetSecurityPre = () => {
    return api.get("/Security");
  };

export const GetPhoneCountryPrefixList = () =>{
   return api.get("/GetPhoneCountryPrefixList");
}