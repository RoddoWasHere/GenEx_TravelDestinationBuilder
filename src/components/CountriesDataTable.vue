<template>
  <div class="dataTable">
    <v-data-table
      v-if="countries"
      :headers="headers"
      :items="countries"
      :items-per-page="10"
      item-key="id"
      class="elevation-1"
      :expanded="expandedItems"
      :value="expandedItems"
      item=""
      :sort-by="'name'"
      width="100%"
      max-width="500px"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <CountryTableCard :country="item" />
        </td>
      </template>

      <template v-slot:[`item.name`]="{ item }">
        <td class="tdBtn" @click="() => expandRow(item)">
          {{ item.name }}
        </td>
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
import CountryTableCard from "./CountryTableCard.vue";
export default {
  props: {
    countries: {
      type: Array,
      required: true,
    },
    singleExpand: {
      type: Boolean,
      required: false,
    },
    canAddToDestinations: {
      type: Boolean,
      required: false,
    },
    canDeleteFromDestinations: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    addToDestinations(item) {
      this.$store.dispatch("addToDestinations", item);
    },
    removeFromDestinations(item) {
      this.$store.dispatch("removeFromDestinations", item);
    },
    hasBeenAdded(item) {
      return this.$store.getters.destinationsContains(item);
    },
    expandRow(item) {
      //remove if exists
      if (
        this.expandedItems.find((c, i) => {
          if (c.id == item.id) {
            this.expandedItems.splice(i, 1);
            return true;
          }
          return false;
        })
      ) {
        //removed (collapsed)
      } else {
        //add (expand)
        if (this.singleExpand) this.expandedItems = [];
        this.expandedItems.push(item);
      }
    },
  },
  data() {
    console.log(
      "can?",
      this.canAddToDestinations,
      this.canDeleteFromDestinations
    );
    const hasActions =
      this.canAddToDestinations || this.canDeleteFromDestinations;
    const headers = [
      // {text: "id",value: "id" },//debugging
      { text: "Name", value: "name" },
      { text: "Region", value: "region" },
    ];
    if (hasActions)
      headers.push({ text: "Actions", value: "actions", sortable: false });
    return {
      hasActions,
      expandedItems: [],
      selectedCountry: null,
      headers,
    };
  },
  components: { CountryTableCard },
};
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
</style>
