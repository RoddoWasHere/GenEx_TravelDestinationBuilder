<template>
  <v-combobox
    placeholder="Start typing to search"
    prepend-icon="mdi-magnify"
    label="Search"
    :search-input.sync="search"
    class="searchInput"
    :loading="isLoading"
  />
</template>

<script>
import Country from "@/models/Country";
import CountryRestService from "@/services/CountryRestService";

export default {
  props: {
    onResultsReturned: {
      type: Function,
      required: false,
    },
    onTextEntered: {
      type: Function,
      required: false,
    },
  },
  data: () => ({
    entries: [],
    isLoading: false,
    search: null,
    searchText: "",
  }),
  watch: {
    search(val) {
      this.searchText = val;
      if (this.onTextEntered) this.onTextEntered(val);

      if (!val || val === "") return;

      CountryRestService.findCountriesByName(val)
        .then((res) => {
          if (this.searchText != val) {
            // response outdated, discard response
            this.isLoading = true;
            return;
          }

          //convert to models
          const entries = res.data.map((c) => new Country(c));

          // remove results not matched with common name
          const filteredEntries = entries.filter(
            (i) => i.name.toLowerCase().indexOf(val.toLowerCase()) != -1
          );
          this.entries = filteredEntries;

          this.onResultsReturned(filteredEntries);
        })
        .catch((err) => {
          console.log(err);

          if (err.message == "Request failed with status code 404") {
            //404: no matches
            this.entries = [];
            this.onResultsReturned(this.entries);
          } else {
            this.onResultsReturned(null);
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
.searchInput {
  width: 100%;
}
</style>
