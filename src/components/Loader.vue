<template>
  <div class="loaderContainer">
    <v-progress-circular :size="70" :width="7" color="grey" indeterminate>
    </v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style scoped>
.loaderContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 50px;

  position: relative;
  height: 0px;
  padding: 0px;
  top: 50px;
}
</style>
