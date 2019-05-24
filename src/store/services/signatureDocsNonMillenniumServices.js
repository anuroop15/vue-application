import api from './api'

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

export const SeePublishedDocument = (documentDetails, forSigned, access_token, locale) => {
  const paramsObj = {
    idDocumentTrack: documentDetails.idDocTrack,
    idCompany: documentDetails.idCompany,
    idCustomer: documentDetails.idCustomer
  }
  access_token ? paramsObj.access_token = access_token : paramsObj
  forSigned ? paramsObj.idDocument = documentDetails.idDocument : paramsObj
  return api({
    url: `${locale}/customer/SeePublishedDocument`,
    method: "get",
    responseType: 'arraybuffer',
    params: paramsObj
  })
}
export const CheckDocumentExistence = (documentDetails, locale) => {
  const formData = new FormData()
  formData.set('idDocument', documentDetails.idDocument)
  return api({
    url: `${locale}/box/json/CheckDocumentExistence`,
    method: "post",
    data: formData
  });
}
export const DownloadPDFsConcatenated = (documentDetails, locale) => {
  const formData = new FormData()
  for(var i = 0; i < documentDetails.length; i++) {
    formData.append('idDocumentTracks', documentDetails[i])
  }
  return api({
    url: `${locale}/customer/DownloadPDFsConcatenated`,
    method: "post",
    responseType: 'arraybuffer',
    data: formData
  });
}
export const GetDocumentsToAccept = (locale) => {
  return api({
    url: `${locale}/customer/json/GetDocumentsToAccept`,
    method: "post"
  });
};
export const GetDocTrackDetail = (docTrackDetails, locale) => {
  const formData = new FormData()
  formData.set('idDocTrack', docTrackDetails.idDocTrack)
  formData.set('idCustomer', docTrackDetails.idCustomer)
  formData.set('idCompany', docTrackDetails.idCompany)
  return api({
    url: `${locale}/customer/json/GetDocTrackDetail`,
    method: "post",
    data: formData
  });
}

export const GenerateOauthTokenForDocument = (locale)=>{
  return api({
      url:`${locale}/virginia/json/GenerateOauthTokenForDocument`,
      method:"post"
  })
}