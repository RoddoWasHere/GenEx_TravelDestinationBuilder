import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://restcountries.com/v3.1",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getCountries() {
    return apiClient.get("/all");
  },
  getCountry(code) {
    return apiClient.get(
      `/alpha/${code}?fields=name,cca3,region,subregion,latlng,flag,flags`
    );
  },
  findCountriesByName(name) {
    return apiClient.get(`/name/${name}?fields=name,cca3,region`);
    //return apiClient.get(`/name/${name}?fields?name,cca3,region,subregion,latlng,flag,flags`);
  },
};
