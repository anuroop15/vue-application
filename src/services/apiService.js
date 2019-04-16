import axios from 'axios'

const apiService = {
  getTodos () {
    return new Promise((resolve, reject) => {
      axios.get('https://jsonplaceholder.typicode.com/todos').then(response => {
        resolve(response.data)
      }).catch(response => {
        reject(response.status)
      })
    })
  },
  getProfileDetails () {

  }
}

export default apiService
