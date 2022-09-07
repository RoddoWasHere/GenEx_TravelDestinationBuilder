import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const countriesApiClient = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

//https://restcountries.com/v3.1/all


export default {
  getEvents() {
    return apiClient.get('/events')
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  getCountries() {
    return countriesApiClient.get('/all');
  },
  getCountry(code) {
    return countriesApiClient.get(`/alpha/${code}`);
  },
  findCountriesByName(name) {
    return countriesApiClient.get(`/name/${name}`);
  }
}
