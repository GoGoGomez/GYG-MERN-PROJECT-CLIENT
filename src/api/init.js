import axios from 'axios'

// Create an axios instance
const api = axios.create({
  baseURL: 'https://gyg-server.herokuapp.com' // API server
})


export default api