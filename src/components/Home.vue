<template>
  <Header />
  <h2>Hello {{ userInfo.name }} , Welcome on Home Page</h2>
  <v-text-field
    :loading="loading"
    density="compact"
    variant="solo"
    label="Search by restaurant name"
    single-line
    v-model="search"
    @change="onClick"
    class="search"
  ></v-text-field>

  <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <v-col v-for="item in restaurants" :key="item.id">
        <v-hover v-slot="{ isHovering, props }" close-delay="100">
          <v-sheet class="">
            <v-card
              class="mx-2 my-5"
              :elevation="isHovering ? 16 : 2"
              v-bind="props"
              :class="{ 'on-hover': isHovering }"
              min-width="250"
              max-width="250"
            >
              <template v-slot:loader="{ isActive }">
                <v-progress-linear
                  :active="isActive"
                  color="deep-purple"
                  height="4"
                  indeterminate
                ></v-progress-linear>
              </template>

              <v-img height="250" :src="item.file"></v-img>
              <v-card-item>
                <v-card-title>{{ item.name }}</v-card-title>
                <v-card-subtitle>
                  <span class="mr-1">{{ item.contact }}</span>
                  <v-icon
                    color="error"
                    icon="mdi-fire-circle"
                    size="small"
                  ></v-icon>
                </v-card-subtitle>
              </v-card-item>
              <v-card-text>
                <div>
                  {{ item.address }}
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="gray" variant="plain">
                  <router-link :to="'/update/' + item._id">Edit</router-link>
                </v-btn>
                <v-btn color="red" variant="plain" @click="onDelete(item._id)">
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-sheet>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
  <v-pagination
    v-model="page"
    :length="restaurantsCount"
    circle
    @click="fetchRestaurants(search)"
  ></v-pagination>
</template>

<script>
import axios from "axios";
import Header from "./Header.vue";
import { API_URL } from "../config/constant";
export default {
  name: "Home",
  data() {
    return {
      userInfo: {},
      restaurants: [],
      restaurantsCount: 0,
      loading: false,
      selection: 1,
      loading: false,
      search: "",
      page: 1,
    };
  },
  components: {
    Header,
  },
  methods: {
    onDelete(id) {
      axios.delete(`${API_URL}/restaurants/${id}`).then((e) => {
        if (e.status === 200) {
          this.fetchRestaurants();
        }
      });
    },
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    fetchRestaurants(search) {
      let val = search ? `&name=${search}` : "";
      axios
        .get(
          `${API_URL}/restaurants/all/${this.userInfo._id}?page=${this.page}&perPage=4${val}`
        )
        .then((e) => {
          if (e.status === 200) {
            this.restaurants = e.data.data;
            this.restaurantsCount = e.data.totalPages;
            this.loading = false;
            this.loaded = true;
          }
        });
    },
    onClick(event) {
      this.loading = true;
      this.fetchRestaurants(this.search);
    },
  },
  mounted() {
    let user = localStorage.getItem("userInfo");

    if (!user) {
      this.$router.push({ name: "LogIn" });
    }
    // this.name = JSON.parse(user)?.name;
    this.userInfo = JSON.parse(user);
    this.fetchRestaurants(null);
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 70px;
}
.action {
  display: flex;
  justify-content: space-evenly;
}
a {
  color: green;
  text-decoration: none;
  background-color: white;
}
.search {
  width: 500px;
  /* display: flex; */
  /* justify-content: center; */
  margin: 10px auto;
}
</style>
