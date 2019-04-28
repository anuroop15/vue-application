import axios from 'axios';
const CSRFToken =
  "9cf7653ae8b84548b777faa39d5d6306=f8796b8e-c880-4488-a0e9-9a0a0f703f5a";

// https://miaecowasdev.mia.usa.sinvest/eco-pre-int/en/customer/SeePublishedDocument?idDocumentTrack=DT1909200058&idCompany=US0010001&idCustomer=49436

  const headers = {
    Accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/x-www-form-urlencoded",
    "x-requested-with": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*"
  }

const api = axios.create({
  baseURL: `https://miaecowasdev.mia.usa.sinvest/eco-pre-int/en/customer/json`,
  withCredentials: false,
  headers: headers
});

/**
 * Return a promise of http get to /todos
 * @returns {Promise} object represent the api call
 */
// export const demoServiceGetAll = () =>{
//     return apiClientExample.get('/todos');
// }
// /**
//  * Return a promise of the http get call to specific ide
//  * @param {ID} id the id of the item to get
//  * @returns {Promise} object represent the api call
//  */
// export const demoServiceGetOne = (id) =>{
//     return apiClientExample.get(`/todos/${id}`);
// }


// add only this
export const SeePublishedDocument = (documentDetails) => {
  return api({
    url: "/SeePublishedDocument",
    method: "get",
    params: {
      idDocumentTrack: documentDetails.idDocTrack,
      idCompany: documentDetails.idCompany,
      idCustomer: documentDetails.idCustomer
    }
  })
}

export const GetDocumentsToAccept = () => {
  return api({
    url: "/GetDocumentsToAccept",
    method: "post"
  });
};

export const getLocalData = () => {
    return axios.get('http://localhost:8081/api/signaturesDocsApi.json').then(response => {
      return response.data
    })
  }
