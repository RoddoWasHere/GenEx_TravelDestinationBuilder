import CountryRestService from "@/services/CountryRestService";

class Country {
  id;
  name;
  region;
  subregion;
  coords = {
    longitude: null,
    latitude: null,
  };
  flagImage;
  flagText;

  static countriesCache = {}; //cached lookup

  constructor(responseData) {
    this.fromResponseData(responseData);
  }
  static fromCountryData(countryData) {
    const countryTp = new Country({});
    countryTp.fromCountryData(countryData);
    return countryTp;
  }

  fromResponseData(responseData) {
    this.id = responseData.cca3;
    this.name = responseData.name ? responseData.name.common : null;
    this.region = responseData.region;
    this.subregion = responseData.subregion;
    this.coords.longitude = responseData.latlng ? responseData.latlng[1] : null;
    this.coords.latitude = responseData.latlng ? responseData.latlng[0] : null;
    this.flagImage = responseData.flags ? responseData.flags.png : null;
    this.flagText = responseData.flag;
  }
  fromCountryData(countryData) {
    this.id = countryData.id;
    this.name = countryData.name;
    this.region = countryData.region;
    this.subregion = countryData.subregion;
    this.coords.longitude = countryData.coords.longitude;
    this.coords.latitude = countryData.coords.longitude;
    this.flagImage = countryData.flagImage;
    this.flagText = countryData.flagText;
  }

  static async findCountry(countryId) {
    return new Promise((resolve, reject) => {
      //check cache
      if (this.countriesCache[countryId])
        resolve(Country.fromCountryData(this.countriesCache[countryId]));

      //not in cache, fetch...
      CountryRestService.getCountry(countryId)
        .then((res) => {
          if (res.data) {
            //cache
            const countryTemp = new Country(res.data);
            this.countriesCache[countryId] = countryTemp;
            resolve(countryTemp);
          }
          return null;
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

window.Country = Country;

export default Country;
