<template>
  <v-list-item three-line>
    <v-list-item-content>
      <div class="text-overline mb-4">
        DETAILS
      </div>
      <v-list-item-title class="text-h5 mb-1">
        {{ country.name.common }}
      </v-list-item-title>


      <v-list-item-subtitle>
        <div class="flagContainer">
          <img 
            :src="country.flags.png" 
            :alt="country.flag"
          />
        </div>
      </v-list-item-subtitle>
        <v-list-item-content class="smallListContent">
          <v-list-item-title>Region</v-list-item-title>
          <v-list-item-subtitle v-text="country.region"></v-list-item-subtitle>
          <div class="spacer"/>
          <v-list-item-title>Subregion</v-list-item-title>
          <v-list-item-subtitle v-text="country.subregion"></v-list-item-subtitle>
          <div class="spacer"/>
          <v-list-item-title>Latitude</v-list-item-title>
          <v-list-item-subtitle v-text="country.latlng[1]"></v-list-item-subtitle>
          <div class="spacer"/>
          <v-list-item-title>Longitude</v-list-item-title>
          <v-list-item-subtitle v-text="country.latlng[0]"></v-list-item-subtitle>
          <div class="spacer"/>
        </v-list-item-content>

      <!-- <v-list-item-subtitle>
        <v-simple-table>
          <tbody>
            <tr>
              <td>Region</td><td>{{country.region}}</td>
            </tr>
            <tr>
              <td>Subregion</td><td>{{country.subregion}}</td>
            </tr>
            <tr>
              <td>Longitute</td><td>{{country.latlng[1]}}</td>
            </tr>
            <tr>
              <td>Latitude</td><td>{{country.latlng[0]}}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-list-item-subtitle> -->
    </v-list-item-content>

    <!-- <v-list-item-avatar
      tile
      width="160"
      height="80"
      color="grey"
      class="dropShadow"
    >
      <img 
        :src="country.flags.png" 
        :alt="country.flag"
      />
    </v-list-item-avatar> -->
  </v-list-item>
</template>


<script>
//import CountryModal from "../views/CountryModal.vue";

export default {
    props: {
        country: {
            type: Object,
            //required: true
        }
    },
    // state
    // data() {
    //     return {
    //         showModal: false
    //     };
    // },
    // methods: {
    //   openModal() {
    //     //alert("Something?: " + name);
    //     this.showModal = true;
    //   },
    //   closeModal() {
    //     //alert("Something?: " + name);
    //     this.showModal = false;
    //   },
    //   addToDestinations() {
    //     this.$store.state.destinations.push(this.country);
    //   },
    // },
    // components: { CountryModal }
  }
  </script>

  <style scoped>
    .flagContainer {
      border: 1px solid #0003;
      height: 100px;
      /* background: grey; */
      display: inline-flex;
      /* box-shadow: 2px 2px 4px #0005; */
      /* z-index: 99999; */
      margin: 10px 0px;
      /* box-sizing: border-box; */
    }
    .dropShadow{
      box-shadow: 2px 2px 4px #0005;
    }
    .spacer {
      height: 5px;
    }
    </style>