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

          // remove results not matched with common name
          const filteredEntries = res.data.filter(
            (i) => i.name.common.indexOf(val) != -1
          );
          this.count = filteredEntries.length;
          this.entries = filteredEntries;

          this.onResultsReturned(filteredEntries);
        })
        .catch((err) => {
          console.log(err);
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
