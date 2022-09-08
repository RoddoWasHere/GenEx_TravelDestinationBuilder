<template>
  <div class="myDrawerContainer">
    <div v-if="drawerOpen" class="drawerOverlay" @click="closeDrawer">
      <div class="myDrawer">
        <v-list
          color="primary"
          dark
          elevation="5"
          nav
        >
          <v-list-item-group
            v-model="group"
            active-class="text--accent-4"
          >
            <slot/>
          </v-list-item-group>
        </v-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBarDrawer",
  props: {
    drawerOpen: {
      type: Boolean,
      required: false
    },
    setDrawerOpen: {
      type: Function,
      required: false
    },
  },
  methods:{
    closeDrawer(){
      // this.drawerOpen = false;
      this.setDrawerOpen(false);
    }
  }
};
</script>

<style scoped>
.drawContainer {
  position: absolute;
  width: 100%;
  /* display: contents; */
  height: 100%;
}
.myDrawerContainer{
  position: relative;
  z-index: 99999;
}
.myDrawer{
  position: absolute;
  color: white;
}
.drawerOverlay{
  width: 100%;
  height: 100vh;
  background: #0005;
  position: absolute;
}
</style>