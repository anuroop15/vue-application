import api from './api'
import axios from 'axios'


export const GetDeliveries = () => {
  return axios.get('http://localhost:8081/api/getDeliveries.json').then(response => {
    return response
  })
};
