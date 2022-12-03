<template>
  <v-layout>
    <v-app-bar color="primary" density="compact">
      <!-- <v-app-bar-nav>
        <v-img
          src="https://media.istockphoto.com/id/1320459002/vector/you-are-here-map-pointer-icon-gps-location-symbol.jpg?s=612x612&w=0&k=20&c=uQn4JQhimrxMTgZYLOOK14gFeuw_UH5W2AD2_MDPxJM="
          height="128"
          cover
        ></v-img>
      </v-app-bar-nav> -->
      <v-app-bar-title class="title" @click="navigate">@Here </v-app-bar-title>

      <router-link to="/">
        <v-btn :class="activeNav === 'Home' && 'active'"
          >Home
        </v-btn></router-link
      >

      <router-link to="/add">
        <v-btn :class="activeNav === 'Add' && 'active'">
          Add Restaurant
        </v-btn></router-link
      >
      <v-btn @click="logout">
        <a> Logout</a>
      </v-btn>
    </v-app-bar>
  </v-layout>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      activeNav: "Home",
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "LogIn" });
    },
    navigate() {
      this.$router.push({ name: "Home" });
    },
  },
  mounted() {
    this.activeNav = this.$route?.name;
  },
};
</script>

<style scoped>
.v-app-bar .v-btn {
  box-shadow: 0px 0px 0px 0px
      var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px 0px 0px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0px 0px 0px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
  color: black;
  text-decoration: none;
}
a {
  background-color: transparent;
  text-decoration: none;
  color: black;
}
a .active {
  background-color: #e52639;
  color: white !important;
}
.bg-primary {
  --v-theme-overlay-multiplier: var(--v-theme-primary-overlay-multiplier);
  background: #ffffff !important;
  color: black !important;
  /* color: rgb(var(--v-theme-on-primary)) !important; */
}
.title {
  cursor: pointer;
}
</style>
