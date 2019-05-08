// import api from './api'
import axios from 'axios';
const CSRFToken =
  "9cf7653ae8b84548b777faa39d5d6306=f8796b8e-c880-4488-a0e9-9a0a0f703f5a";

  const headers = {
    Accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/x-www-form-urlencoded",
    "x-requested-with": "XMLHttpRequest",
  }

const api = axios.create({
  baseURL: `https://miaecowasdev.mia.usa.sinvest/eco-pre-int-vue/en/`,
  withCredentials: true,
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

// export const SeePublishedDocument = (documentDetails, forSigned) => {
//   const paramsObj = {
//     idDocumentTrack: documentDetails.idDocTrack,
//     idCompany: documentDetails.idCompany,
//     idCustomer: documentDetails.idCustomer
//   }
//   forSigned ? paramsObj.idDocument = documentDetails.idDocument : paramsObj
//   return api({
//     url: "customer/SeePublishedDocument",
//     method: "get",
//     responseType: 'arraybuffer',
//     params: paramsObj
//   })
// }
// export const CheckDocumentExistence = (documentDetails, additionalData) => {
//   const formData = new FormData()
//   formData.set('idDocument', documentDetails.idDocument)
//   return api({
//     url: "/box/json/CheckDocumentExistence",
//     method: "post",
//     data: formData
//   });
// }
// export const DownloadPDFsConcatenated = (documentDetails) => {
//   const formData = new FormData()
//   for(var i = 0; i < documentDetails.length; i++) {
//     formData.append('idDocumentTracks', documentDetails[i])
//   }
//   return api({
//     url: "/customer/DownloadPDFsConcatenated",
//     method: "post",
//     responseType: 'arraybuffer',
//     data: formData
//   });
// }
// export const GetDocumentsToAccept = () => {
//   return api({
//     url: "customer/json/GetDocumentsToAccept",
//     method: "post"
//   });
// };
// export const GetDocTrackDetail = (docTrackDetails) => {
//   const formData = new FormData()
//   formData.set('idDocTrack', docTrackDetails.idDocTrack)
//   formData.set('idCustomer', docTrackDetails.idCustomer)
//   formData.set('idCompany', docTrackDetails.idCompany)
//   return api({
//     url: "/customer/json/GetDocTrackDetail",
//     method: "post",
//     data: formData
//   });
// }
export const GetDocTrackDetail = (docTrackDetails) => {
  return axios.get('http://localhost:8081/api/GetDocTrackDetail.json').then(response => {
    return response
  })
}
export const SeePublishedDocument = (documentDetails) => {
  return axios.get('http://localhost:8081/api/signed.pdf').then(response => {
    return response
  })
}
export const CheckDocumentExistence = (documentDetails, additionalData) => {
  return axios.get('http://localhost:8081/api/checkDocExistence.json').then(response => {
    return response
  })
}
export const GetDocumentsToAccept = () => {
  return axios.get('http://localhost:8081/api/signaturesDocsApi.json').then(response => {
    return response.data
  })
};
export const getLocalData = () => {
    return axios.get('http://localhost:8080/api/signaturesDocsApi.json').then(response => {
      return response.data
    })
  }
