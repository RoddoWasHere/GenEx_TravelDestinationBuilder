<template>
    <!-- <v-card
      light
    > -->
      <!-- <v-card-title class="text-h5 red lighten-3">
        Search for Public APIs
      </v-card-title>
      <v-card-text>
        Explore hundreds of free API's ready for consumption! For more information visit
        <a
          class="grey--text text--lighten-3"
          href="https://github.com/toddmotto/public-apis"
          target="_blank"
        >the GitHub repository</a>.
      </v-card-text> -->
      <!-- <v-card-text> -->
        <v-combobox
          placeholder="Start typing to search"
          prepend-icon="mdi-magnify"
          label="Countries"
          :search-input.sync="search"
          class="searchInput"
          :loading="isLoading"
        />
        <!-- <v-autocomplete
          v-model="model"
          :items="items"
          :loading="isLoading"
          :search-input.sync="search"
          color="black"
          hide-no-data
          hide-selected
          item-text="Description"
          item-value="API"
          label="Countries"
          placeholder="Start typing to search"
          prepend-icon="mdi-magnify"
          return-object
        ></v-autocomplete> -->
      <!-- </v-card-text> -->
      <!-- <v-divider></v-divider> -->
      <!-- <v-expand-transition>
        <v-list
          v-if="model"
          class="red lighten-3"
        >
          <v-list-item
            v-for="(field, i) in fields"
            :key="i"
          >
            <v-list-item-content>
              <v-list-item-title v-text="field.value"></v-list-item-title>
              <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-expand-transition> -->
      <!-- <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!model"
          color="grey darken-3"
          @click="model = null"
        >
          Clear
          <v-icon right>
            mdi-close-circle
          </v-icon>
        </v-btn>
      </v-card-actions> -->
    <!-- </v-card> -->
  </template>

<script>
import EventService from '@/services/EventService'

export default {
  props: {
    onResultsReturned: {
      type: Function,
      required: false
    },
    onTextEntered: {
      type: Function,
      required: false
    },
  },
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null,
    runningRequests: 0,
    searchText:"",
    textQueries: [],
  }),
  methods: {
    onChange() {
      console.log("onchange?", arguments);
    }
  },
  computed: {
    fields () {
      if (!this.model) return []

      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || 'n/a',
        }
      })
    },
    items () {
      console.log("items?", this.entries.map(i => i.name.common));
      //return this.entries;
      return [];
      //return this.entries.map(i => i.name.common);
      // return this.entries.map(entry => {
      //   const Description = entry.Description.length > this.descriptionLimit
      //     ? entry.Description.slice(0, this.descriptionLimit) + '...'
      //     : entry.Description

      //   return Object.assign({}, entry, { Description })
      // })
      // return this.entries.map(entry => {
      //   const Description = entry.Description.length > this.descriptionLimit
      //     ? entry.Description.slice(0, this.descriptionLimit) + '...'
      //     : entry.Description

      //   return Object.assign({}, entry, { Description })
      // })
    },
  },

  watch: {
    search (val) {
      // // Items have already been loaded
      // if (this.items.length > 0) return;

      // // Items have already been requested
      // if (this.isLoading) return;

      // this.isLoading = true;
      this.searchText = val;
      if(this.onTextEntered) this.onTextEntered(val);

      if(!val || val==="") return;


      this.runningRequests++;
      // Lazily load input items
      console.log("search val?", val);
      
      EventService.findCountriesByName(val)
        .then(res => {

          //if(this.runningRequests > 1) return; //newer request running, discard current result 
          //if(textQueries.length > 1)
          if(this.searchText != val){
            console.log("response outdated");
            this.isLoading = true;
            return;
          }

          //const { count, entries } = res
          console.log("search response?", res);
          const filteredEntries = res.data.filter(i => i.name.common.indexOf(val) != -1);//.map(i => i.name.common);
          console.log("search entries?", val, filteredEntries);
          this.count = filteredEntries.length;
          this.entries = filteredEntries;

          this.onResultsReturned(filteredEntries);
          // this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          // this.isLoading = false;
        })
        .finally(() => {
          this.isLoading = false;
          this.runningRequests--;
        })

      // fetch('https://api.publicapis.org/entries')
      //   .then(res => res.json())
      //   .then(res => {
      //     const { count, entries } = res
      //     this.count = count
      //     this.entries = entries
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
      //   .finally(() => (this.isLoading = false))
    },
  },
}
</script>

<style scoped>
.searchInput {
  width: 100%;
}
</style>