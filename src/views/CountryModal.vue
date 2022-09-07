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
  <div v-if="country" class="country-modal">
    <div class="country-modal-inner">
      <button @click="onClose">close</button>
      <h1>{{ country.name.common }}</h1>
      <h1>{{ country.region }}</h1>
      <p>lat: {{ country.latlng[0] }}, long: {{ country.latlng[1] }}</p>
      <p>
        <img :src="country.flags.png" :alt="country.flag">
      </p>
      <slot/>
    </div>
  </div>
</template>

<script>
//import EventService from '@/services/EventService.js'
export default {
  // props: ['id'],
  props: {
      country: {
          type: Object,
          required: true
      },
      onClose: Function
  },
  data() {
    return {
      //event: null,
      //country: null
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
  //   console.log("this?", this.id);
  //   EventService.getCountry(this.id)
  //     .then(response => {
  //       console.log("got country?", response.data);
  //       this.country = response.data[0];
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  }
}
</script>
  

<style scoped>
.country-modal {
  position: relative;
  /* width: 100%; */
  display: flex;
  justify-content: center;
}
.country-modal-inner {
    padding: 20px;
    /* width: 100%; */
    cursor: pointer;
    border: 1px solid #39495c;
    margin-bottom: 18px;
    position: absolute;
    background: white;
}
</style>