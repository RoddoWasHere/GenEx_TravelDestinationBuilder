<template>
  <v-card class="mainLayout">
    <v-card-title>My Destinations</v-card-title>
    <v-card-text>
      <CountriesDataTable
        v-if="countries"
        :countries="countries"
        canDeleteFromDestinations
      />
      <Loader v-if="!countries" />
    </v-card-text>
  </v-card>
</template>

<script>
import Loader from "@/components/Loader.vue";
import CountriesDataTable from "@/components/CountriesDataTable.vue";

export default {
  name: "MyDestinations",

  data() {
    console.log("state?", this.$store.getters.destinations);

    return {
      countries: this.$store.getters.destinations,
    };
  },
  components: {
    Loader,
    CountriesDataTable,
  },
};
</script>
