import axios from 'axios'

// const baseUrl = 'http://localhost:8081/'


export const getLocalData = () => {
  return axios.get('http://localhost:8081/api/signatures.json').then(response => {
    return response
  })
}
