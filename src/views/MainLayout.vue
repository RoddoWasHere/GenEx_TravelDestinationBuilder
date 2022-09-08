<template>
  <v-app class="app">
    <!-- Banner -->
    <div class="banner showDesktopOnly">
      <div class="bannerImageOverlay">
        <img class="bannerLogoImg" :src="require('../assets/logo.png')" />
        <h1>Travel Destination Builder</h1>
      </div>
      <img class="bannerImage" :src="require('../assets/banner.jpg')" />
    </div>

    <!-- Nav bar 1 -->
    <v-card class="navBar showMobileOnly">
      <v-app-bar app color="primary" dark class="navBar" clipped-left>
        <div class="d-flex align-center">
          <v-app-bar-nav-icon
            class="showMobileOnly"
            large
            @click="idDrawerOpen = !idDrawerOpen"
          ></v-app-bar-nav-icon>
          <v-icon large class="showDesktopOnly">mdi-airplane</v-icon>
          <h1 class="logoTitle">&nbsp;Destination Builder</h1>
        </div>

        <v-spacer></v-spacer>
      </v-app-bar>
    </v-card>

    <!-- Nav bar 2 -->
    <v-card class="navBar showDesktopOnly">
      <v-app-bar color="primary" dark class="navBar">
        <v-toolbar-item class="showDesktopOnly">
          <v-btn text color="white" @click="gotoPage('Countries')">
            <span :class="navBtnClass('Countries')"> Countries </span>
          </v-btn>
          <v-btn
            v-if="hasDestinations"
            text
            color="white"
            @click="gotoPage('MyDestinations')"
          >
            <span :class="navBtnClass('MyDestinations')"> My List </span>
          </v-btn>
        </v-toolbar-item>
      </v-app-bar>
    </v-card>

    <!-- Nav bar drawer -->
    <NavBarDrawer
      :drawerOpen="idDrawerOpen"
      :setDrawerOpen="(isOpen) => (idDrawerOpen = isOpen)"
    >
      <v-list-item @click="gotoPage('Countries')">
        <div class="navBarIcon">
          <v-icon>mdi-earth</v-icon>
        </div>
        <v-list-item-title :class="navBtnClass('Countries')">
          Countries
        </v-list-item-title>
      </v-list-item>

      <v-list-item @click="gotoPage('MyDestinations')" v-if="hasDestinations">
        <div class="navBarIcon">
          <v-icon>mdi-airplane</v-icon>
        </div>
        <v-list-item-title :class="navBtnClass('MyDestinations')">
          My List
        </v-list-item-title>
      </v-list-item>
    </NavBarDrawer>

    <!-- Main content -->
    <v-main class="main">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavBarDrawer from "@/components/NavBarDrawer.vue";
export default {
  data: () => ({
    idDrawerOpen: false,
    currentPageName: "Countries",
  }),
  computed: {
    hasDestinations() {
      return this.$store.getters.destinations.length > 0;
    },
  },
  methods: {
    navBtnClass(name) {
      return this.currentPageName == name ? "navButtonSelected" : "";
    },
    gotoPage(name) {
      this.currentPageName = name;
      this.$router.push({ name });
    },
  },
  components: { NavBarDrawer },
};
</script>

<style scoped>
.banner {
  height: 32vw;
}
.bannerImage {
  width: 100%;
}
.bannerLogoImg {
  width: 15vw;
  margin-bottom: -20px;
}
.bannerImageOverlay {
  /* background: linear-gradient(0deg, #a35300, #00000000); */
  background: linear-gradient(0deg, #a32700e0, #a35300eb 10%, #00000000);
  width: 100%;
  height: 32vw;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2vw;
  color: white;
  text-shadow: 0 0 2vw black;
}

.navButtonSelected {
  border-bottom: 2px solid #fff8;
  font-weight: 900;
  color: white;
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
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
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

.navBarIcon {
  margin-right: 12px;
  color: white;
}
.logoTitle {
  font-size: 28px;
}

/* Desktop only */
@media only screen and (min-width: 400px) {
  .showMobileOnly {
    display: none;
  }
}

/* Mobile only */
@media only screen and (max-width: 400px) {
  .showDesktopOnly {
    display: none;
  }
  .logoTitle {
    font-size: 22px;
  }
}
</style>
