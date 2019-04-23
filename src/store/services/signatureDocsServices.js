import axios from 'axios';
const apiClientExample = axios.create({
    baseURL: `http://localhost:8080/data`,
    withCredentials: false,
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
/**
 * Return a promise of http get to /todos
 * @returns {Promise} object represent the api call
 */
// export const demoServiceGetAll = () =>{
//     return apiClientExample.get('/todos');
// }
// /**
//  * Return a promise of the http get call to specific id
//  * @param {ID} id the id of the item to get
//  * @returns {Promise} object represent the api call
//  */
// export const demoServiceGetOne = (id) =>{
//     return apiClientExample.get(`/todos/${id}`);
// }
export const getLocalData = () => {
    return axios.get('http://localhost:8081/api/signaturesDocsApi.json').then(response => {
      return response.data
    })
  }
