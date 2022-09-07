<!-- 
{
    "cioc": "FIN", #ID
    "name": {
      "common": "Finland",
    },
    "region": "Europe",
    "subregion": "Northern Europe",
    "latlng": [
      64.0,
      26.0
    ],
    "flags": {
      "png": "https://flagcdn.com/w320/fi.png",
      "svg": "https://flagcdn.com/fi.svg"
    },
}


 -->


<template>
  <div v-if="country">
    <h1>{{ country.name.common }}</h1>
    <h1>{{ country.region }}</h1>
    <p>lat: {{ country.latlng[0] }}, long: {{ country.latlng[1] }}</p>
    <p>
      <img :src="country.flags.png" :alt="country.flag">
    </p>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'
export default {
  props: ['id'],
  data() {
    return {
      event: null,
      country: null
    }
  },
  created() {
    // EventService.getEvent(this.id)
    //   .then(response => {
    //     this.event = response.data
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
    console.log("this?", this.id);
    EventService.getCountry(this.id)
      .then(response => {
        console.log("got country?", response.data);
        this.country = response.data[0];
      })
      .catch(error => {
        console.log(error);
      })
  }
}
</script>
