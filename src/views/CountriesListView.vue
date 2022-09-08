<template>
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
        <CountriesDataTable
          v-if="countries" 
          :countries="countries"
          canAddToDestinations
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import CountryRestService from '@/services/CountryRestService.js'
import CountrySearchBox from '@/components/CountrySearchBox.vue'
import Loader from '../components/Loader.vue'
import CountriesDataTable from '@/components/CountriesDataTable.vue'

export default {
  name: 'CountriesListView',
  components: {
    CountrySearchBox,
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
      this.countries = results;
      this.isLoading = false;
    },
    onSearchTextEntered(text){
      this.isLoading = true;
      if(!text || text===""){
        this.countries = this.allCountries;
        if(!this.showAllOnBlankSearch)
          this.isLoading = false;
      }
      this.searchText = text;
    },
    getAllCountries(){
      CountryRestService.getCountries()
        .then(response => {
          this.countries = response.data;
          this.allCountries = response.data;
        })
        .catch(error => {
          console.log(error)
        });
    }
  },
  created() {
    this.$store.state.currentPage = "countries";
    if(this.showAllOnBlankSearch)
      this.getAllCountries();
  }
}
</script>

<style>
.mainLayout {
  background: white;
}
</style>
