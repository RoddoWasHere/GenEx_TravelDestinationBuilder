<template>
  <v-app class="app">
    <div class="banner showDesktopOnly">
      <div class="bannerImageOverlay">
        <img class="bannerLogoImg" :src="require('../assets/logo.png')"/>
        <h1>Destination Builder</h1>
      </div>
      <img class="bannerImage" :src="require('../assets/banner.jpg')"/>
    </div>
    <v-card class="navBar showMobileOnly">
    <v-app-bar app color="primary" dark class="navBar" clipped-left>
      <!-- <div class="d-flex align-center"> -->
      <div class="d-flex align-center">
        <!-- <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
        <!-- <div>
         
        </div> -->
        <v-app-bar-nav-icon class="showMobileOnly" large @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-icon large class="showDesktopOnly">mdi-airplane</v-icon>
        <h1 class="logoTitle">
          &nbsp;Destination Builder
        </h1>
      </div>

      <v-spacer></v-spacer>

      <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
    </v-app-bar>
    </v-card>
    <v-card
      class="navBar showDesktopOnly"
    >
      <v-app-bar
        color="primary"
        dark
        class="navBar"
      >
        <!-- <div>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        </div> -->
        <!-- <v-toolbar-title>Destination Builder</v-toolbar-title> -->
        <!-- <v-toolbar-title> </v-toolbar-title>
        <v-toolbar-title>My Destinations</v-toolbar-title> -->
        <v-toolbar-item class="showDesktopOnly">
          <router-link
            :to="{ name: 'Countries' }"
          >
            <v-btn text color="white">Countries</v-btn>
          </router-link>
          <!-- <v-btn text color="white">Countries</v-btn> -->
          <router-link
            v-if="hasDestinations"
            :to="{ name: 'MyDestinations' }"
          >
            <v-btn text color="white">My List</v-btn>
          </router-link>
          <!-- <v-btn text color="white">My Destinations</v-btn> -->
        </v-toolbar-item>
      </v-app-bar>
      
      <!-- <div v-if="drawer" class="drawContainer">
        <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
          clipped
        >
          <v-list
            nav
            dense
          >
            <v-list-item-group
              v-model="group"
              active-class="deep-purple--text text--accent-4"
            >
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-earth</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Countries</v-list-item-title>
              </v-list-item>
    
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-airplane</v-icon>
                </v-list-item-icon>
                <v-list-item-title>My Destinations</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </div> -->
      <!-- <slot/> -->
    </v-card>

    <div class="myNavBarContainer">
      <div v-if="drawer" class="navBarOverlay" @click="()=>drawer=false">
        <div class="myNavBar" @blur="()=>alert()">
          <v-list
            color="primary"
            dark
            elevation="5"
          >
            <v-list-item-group
              v-model="group"
              active-class="text--accent-4"
            >
              <router-link
                :to="{ name: 'Countries' }"
              >
                <v-list-item>
                  <!-- <v-btn text> -->
                    <div class="navBarIcon">
                      <v-icon>mdi-earth</v-icon>
                    </div>
                    <v-list-item-title>Countries</v-list-item-title>
                  <!-- </v-btn> -->
                </v-list-item>
              </router-link>

              <router-link
                v-if="hasDestinations"
                :to="{ name: 'MyDestinations' }"
              >
                <v-list-item>
                  <div class="navBarIcon">
                    <v-icon>mdi-airplane</v-icon>
                  </div>
                  <v-list-item-title>My List</v-list-item-title>
                </v-list-item>
              </router-link>
            </v-list-item-group>
          </v-list>
        </div>
      </div>
    </div>

    <v-main class="main">
      <router-view />
    </v-main>
  <!-- </v-app> -->
  </v-app>
</template>
  
<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
    }),
    created(){
      window.onscroll = () => {
        console.log("scrolling");
      }
    },
    computed:{
      hasDestinations() {
        return this.$store.getters.destinations.length > 0;
      } 
    }
  }
</script>

<style scoped>
.banner {
  /* background-image: url("require('../assets/banner.svg')"); */
  height: 32vw;
}
.bannerImage {
  width: 100%;
}
.bannerLogoImg {
  width: 15vw;
  margin-bottom: -12px;
}
.bannerImageOverlay {
  background: linear-gradient(0deg, #a35300, #00000000);
  width: 100%;
  height: 32vw;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 3vw;
  color: white;
  text-shadow: 0 0 2vw black;
}

.navBar {
  position: unset !important;
  display: flex;
  width: 100%;
}
.main {
  padding: 0px 0px 0px 0px !important;  
  height: 100%;
  overflow-y: auto;
  background: #eee;
  flex: 1 1 auto;
  overflow-x: hidden;
  flex-direction: column;
  align-items: center;

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.main::-webkit-scrollbar {
  display: none;
}


.app {
  /* height: 100vh; */
  height: calc(100vh + 32vw);
  overflow: hidden;
}
.drawContainer {
  position: absolute;
  width: 100%;
  /* display: contents; */
  height: 100%;
}
.navBarIcon{
  margin-right: 12px;
}
/* .showMobileOnly{
  display: none;
} */
/* .showDesktopOnly{
  display: inherit;
} */
.logoTitle{
  font-size: 28px;
}
.myNavBarContainer{
  position: relative;
  z-index: 99999;
}
.myNavBar{
  position: absolute;
}
.navBarOverlay{
  width: 100%;
  height: 100vh;
  background: #0005;
  position: absolute;
}

/* Desktop only */
@media only screen and (min-width: 400px) {
  .showMobileOnly {
    display: none;
  }
}

/* Mobile only */
@media only screen and (max-width: 400px) {
  /* .showMobileOnly {
    display: inherit;
  } */
  .showDesktopOnly{
    display: none;
  }
  .logoTitle{
    font-size: 22px;
  }
}
</style>