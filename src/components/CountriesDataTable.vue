<template>
  <div class="dataTable">
    <v-data-table v-if="countries"
      :headers="headers"
      :items="countries"
      :items-per-page="10"
      :single-expand="true"
      item-key="cca3"
      class="elevation-1"
      single-select
      :expanded="expandedItems"
      :value="expandedItems"
      item=""
      :sort-by="'name.common'"
      width="100%"
      max-width="500px"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <CountryTableCard :country="item" />
        </td>
      </template>

      <template v-slot:[`item.name.common`]="{ item }">
        <td class="tdBtn" @click="()=>expandRow(item)">{{ item.name.common }}</td>
      </template>

      <template v-slot:[`item.actions`]="{ item }" v-if="hasActions">
        <v-btn
          v-if="canAddToDestinations"
          :disabled="hasBeenAdded(item)"
          @click="() => addToDestinations(item)"
          hint="Add to your list of destinations"
        >
          Add
        </v-btn>
        <v-btn
          v-if="canDeleteFromDestinations"
          :disabled="!hasBeenAdded(item)"
          @click="() => removeFromDestinations(item)"
          hint="Add to your list of destinations"
        >
          Remove
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import CountryModal from '@/views/CountryModal.vue';
import CountryTableCard from './CountryTableCard.vue';
  export default {
    props: {
        countries: {
            type: Array,
            required: true
        },
        canAddToDestinations: {
            type: Boolean,
            required: false
        },
        canDeleteFromDestinations: {
            type: Boolean,
            required: false
        },
    },
    methods: {
      addToDestinations(item) {
        this.$store.dispatch('addToDestinations', item);
        // this.$store.state.destinations.push(item);
        // console.log("item?", item);
      },
      removeFromDestinations(item) {
        this.$store.dispatch('removeFromDestinations', item);
        // let index = -1;
        // this.$store.state.destinations.find((c, i) =>{
        //   if(c.cca3 == item.cca3) index = i;
        //   return c.cca3 == item.cca3;
        // });
        // if(index != -1)
        //   this.$store.state.destinations.splice(index, 1);
        // console.log("removing?", index);
      },
      hasBeenAdded(item) {
        return this.$store.getters.destinationsContains(item);
        // const tp = this.$store.state.destinations.find(i => i.cca3 == item.cca3); //TODO: use find
        // console.log("got item", tp);
        // return tp != null;
      },
      expandRow(item) {
        if(this.expandedItems[0] == item)
          this.expandedItems = [];
        else
          this.expandedItems = [item];

        console.log("expanded?", this.expandedItems[0]);
      },
    },
    data() {
      console.log("can?", this.canAddToDestinations, this.canDeleteFromDestinations)
      const hasActions = this.canAddToDestinations || this.canDeleteFromDestinations;
      const headers = [
          // {text: "CCA3",value: "cca3" },//debugging
          {text: "Name", value: "name.common" },
          { text: "Region", value: "region" },
      ];
      if(hasActions) headers.push({ text: "Actions", value: "actions", sortable: false });
      return {
          hasActions,
          expandedItems: [],
          selectedCountry: null,
          headers,
      };
    },
    components: { CountryModal, CountryTableCard }
}
</script>

<style scoped>
.dataTable {
  width: 100%;
  max-width: 600px;
}
.tdBtn {
  cursor: pointer;
}
.tdBtn:hover {
  font-weight: bold;
  background: #ddd;
}
/* .flagContainer {
  height: 100px;
  background: grey;
  display: inline-flex;
  box-shadow: 2px 2px 4px #0005;
}
.dropShadow{
  box-shadow: 2px 2px 4px #0005;
} */
</style>
