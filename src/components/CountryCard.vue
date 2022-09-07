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
}


 -->

<template>
  <!-- <router-link
    class="event-link"
    :to="{ name: 'CountryDetails', params: { id: country.cioc } }"
  > -->
  <div>
    <div class="country-card" @click="() => openModal()">
      <h3>{{ country.name.common }}</h3>
      <p>{{ country.region }}</p>
      <button @click="addToDestinations">Add</button>
    </div>
    <div v-if="showModal">
      <CountryModal :country="country" :onClose="closeModal">
        slot??
      </CountryModal>
    </div>
  </div>
  <!-- </router-link> -->
</template>

<script>
import CountryModal from "../views/CountryModal.vue";

export default {
    props: {
        country: {
            type: Object,
            //required: true
        }
    },
    // state
    data() {
        return {
            showModal: false
        };
    },
    methods: {
      openModal() {
        //alert("Something?: " + name);
        this.showModal = true;
      },
      closeModal() {
        //alert("Something?: " + name);
        this.showModal = false;
      },
      addToDestinations() {
        this.$store.state.destinations.push(this.country);
      },
    },
    components: { CountryModal }
}
</script>

<style scoped>
.country-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}


.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.event-link {
  color: #2c3e50;
  text-decoration: none;
}
</style>