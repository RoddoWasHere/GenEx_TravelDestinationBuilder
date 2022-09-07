<template>
  <!-- <div> -->
    <!-- <v-toolbar-title> -->
      <!-- <h1>Destination Builder</h1> -->
    <!-- </v-toolbar-title> -->
    <!-- <ResponsiveNavBar> -->
      <v-card class="mainLayout">
        <v-card-title>Countries</v-card-title>
        <v-card-text>
          <CountrySearchBox 
            :onResultsReturned="onResultsReturned"
            :onTextEntered="onSearchTextEntered"
          />
          <Loader
            v-if="isLoading"
          />
          <div>
            <div>
              <div>
                
              </div>
            </div>
            <CountriesDataTable
              v-if="countries" 
              :countries="countries"
              canAddToDestinations
            />
          </div>
          <!-- <Loader
            v-if="isLoading"
          /> -->
        </v-card-text>
        <!-- <EventCard v-for="event in events" :key="event.id" :event="event" />
        <CountryCard v-for="country in countries" :key="country.id" :country="country" /> -->
      </v-card>
    <!-- </ResponsiveNavBar> -->
  <!-- </div> -->
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import CountryCard from '@/components/CountryCard.vue'
import EventService from '@/services/EventService.js'
import CountrySearchBox from '@/components/CountrySearchBox.vue'
import ResponsiveNavBar from '@/components/ResponsiveNavBar.vue'
import Loader from '../components/Loader.vue'
import CountriesDataTable from '@/components/CountriesDataTable.vue'

export default {
  name: 'EventList',
  components: {
    EventCard,
    CountryCard,
    CountrySearchBox,
    ResponsiveNavBar,
    Loader,
    CountriesDataTable
},
  data() {
    return {
      events: null,
      countries: null,
      allCountries: null,
      searchText: "",
      isLoading: false,
    }
  },
  props:{
    showAllOnBlankSearch: {
      type: Boolean,
      required: false
    },
  },
  methods: {
    onResultsReturned(results){
      console.log("search items(in Events list)?", results);
      this.countries = results;
      this.isLoading = false;
    },
    onSearchTextEntered(text){
      console.log(text);
      this.isLoading = true;
      if(!text || text===""){
        this.countries = this.allCountries;
        if(!this.showAllOnBlankSearch)
          this.isLoading = false;
      }
      this.searchText = text;
      
    },
    getAllCountries(){
      EventService.getCountries()
        .then(response => {
          this.countries = response.data;
          this.allCountries = response.data;
        })
        .catch(error => {
          console.log(error)
        });
    }
  },
  // computed: {
  //   isLoading() {
  //     if(this.searchText == "") return false;

  //     return !this.countries;
  //   }
  // },
  created() {
    // EventService.getEvents()
    //   .then(response => {
    //     this.events = response.data
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
    if(this.showAllOnBlankSearch)
      this.getAllCountries();
    //else
    //  this.countries = [];

    
  }
}
</script>

<style>
.mainLayout {
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  background: white;
}
</style>
