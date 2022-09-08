<template>
  <v-list-item three-line>
    <v-list-item-content>
      <div class="text-overline mb-4">DETAILS</div>
      <v-list-item-title class="text-h5 mb-1">
        {{ country.name.common }}
      </v-list-item-title>

      <v-list-item-subtitle>
        <div class="flagContainer">
          <img :src="country.flags.png" :alt="country.flag" />
        </div>
      </v-list-item-subtitle>

      <v-list-item-content class="smallListContent">
        <v-list-item-title>Region</v-list-item-title>
        <v-list-item-subtitle v-text="country.region"></v-list-item-subtitle>
        <div class="spacer" />
        <v-list-item-title>Subregion</v-list-item-title>
        <v-list-item-subtitle v-text="country.subregion"></v-list-item-subtitle>
        <div class="spacer" />
        <v-list-item-title>Latitude</v-list-item-title>
        <v-list-item-subtitle v-text="country.latlng[1]"></v-list-item-subtitle>
        <div class="spacer" />
        <v-list-item-title>Longitude</v-list-item-title>
        <v-list-item-subtitle v-text="country.latlng[0]"></v-list-item-subtitle>
        <div class="spacer" />
      </v-list-item-content>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    country: {
      type: Object,
      required: false,
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
