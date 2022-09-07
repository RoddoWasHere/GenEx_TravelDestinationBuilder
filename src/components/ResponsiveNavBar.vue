<template>
  <v-card
    class="mx-auto overflow-hidden"
    height="100%"
  >
    <v-app-bar
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <!-- <v-toolbar-title>Destination Builder</v-toolbar-title> -->
      <!-- <v-toolbar-title> </v-toolbar-title>
      <v-toolbar-title>My Destinations</v-toolbar-title> -->
      <v-toolbar-item>
        <v-btn text color="white">Countries</v-btn>
        <router-link
          class="event-link"
          :to="{ name: 'MyDestinations' }"
        >
          <v-btn text color="white">My Destinations</v-btn>
        </router-link>
        <!-- <v-btn text color="white">My Destinations</v-btn> -->
      </v-toolbar-item>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
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
    <slot/>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
    }),
  }
</script>