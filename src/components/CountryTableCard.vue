<template>
  <v-list-item three-line>
    <v-list-item-content>
      <div class="text-overline mb-4">DETAILS</div>
      <v-list-item-title class="text-h5 mb-1">
        {{ countryData.name }}
      </v-list-item-title>

      <v-list-item-subtitle>
        <div class="flagContainer">
          <v-skeleton-loader
            v-if="isLoading"
            class="mx-auto"
            width="200"
            type="card"
          ></v-skeleton-loader>
          <img
            v-if="!isLoading"
            :src="countryData.flagImage"
            :alt="countryData.flagText"
          />
        </div>
      </v-list-item-subtitle>

      <v-list-item-content class="smallListContent">
        <v-list-item-title>Region</v-list-item-title>
        <v-list-item-subtitle
          v-text="countryData.region"
        ></v-list-item-subtitle>
        <div class="spacer" />
        <v-list-item-title>Subregion</v-list-item-title>
        <v-list-item-subtitle
          v-text="countryData.subregion"
        ></v-list-item-subtitle>
        <div class="spacer" />
        <v-list-item-title>Latitude</v-list-item-title>
        <v-list-item-subtitle
          v-text="countryData.coords.latitude"
        ></v-list-item-subtitle>
        <div class="spacer" />
        <v-list-item-title>Longitude</v-list-item-title>
        <v-list-item-subtitle
          v-text="countryData.coords.longitude"
        ></v-list-item-subtitle>
        <div class="spacer" />
      </v-list-item-content>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import Country from "@/models/Country";

export default {
  data() {
    return {
      countryData: null,
      isLoading: true,
      updateCountryData() {
        this.getCountryData();
        return null;
      },
    };
  },
  props: {
    country: {
      type: Object,
      required: false,
    },
    countryId: {
      type: String,
      required: false,
    },
  },
  created() {
    this.getCountryData();
  },
  computed: {},
  watch: {
    country() {
      this.getCountryData();
    },
  },
  methods: {
    getCountryData() {
      this.isLoading = true;
      this.countryData = Country.fromCountryData(this.country);

      Country.findCountry(this.country.id)
        .then((cResult) => {
          if (cResult && cResult.id == this.countryData.id) {
            this.countryData = cResult;
          }
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
.flagContainer {
  border: 1px solid #0003;
  height: 100px;
  display: inline-flex;
  margin: 10px 0px;
}
.spacer {
  height: 5px;
}
</style>
