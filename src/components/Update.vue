<template>
  <Header />
  <div class="coin">
    <h2>Update Restaurant</h2>
    <v-card>
      <div class="add-res">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter the name"
          v-model="updateRestaurant.name"
        />

        <input
          type="text"
          name="address"
          id="address"
          placeholder="Enter the address"
          v-model="updateRestaurant.address"
        />
        <input
          type="text"
          name="contact"
          id="contact"
          placeholder="Enter the contact"
          v-model="updateRestaurant.contact"
        />

        <button class="add-btn" @click="update">Update</button>
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./Header.vue";
import { API_URL } from "../config/constant";
export default {
  name: "Update",
  components: {
    Header,
  },
  data() {
    return {
      updateRestaurant: {
        name: "",
        address: "",
        contact: "",
      },
    };
  },
  methods: {
    update() {
      let id = this.$route.params.id;
      axios
        .put(`${API_URL}/restaurants/${id}`, this.updateRestaurant)
        .then((e) => {
          if (e.status === 200) {
            // alert("update");

            // this.addRestaurant = {
            //   name: "",
            //   address: "",
            //   contact: "",
            // };
            this.$router.push({ name: "Home" });
            //   const user = JSON.stringify(e.data);
            //   localStorage.setItem("userInfo", user);
          }
        });
    },
  },
  mounted() {
    let id = this.$route.params.id;
    axios.get(`${API_URL}/restaurants/${id}`).then((e) => {
      if (e.status === 200) {
        this.updateRestaurant = e.data;
      }
    });
  },
};
</script>

<style scoped>
.add-res {
  display: block;
}
.add-res input {
  display: block;
  padding: 2px 10px;
  margin: 30px 10px;
  width: 300px;
  height: 35px;
}
.add-btn {
  display: block;
  padding: 2px 10px;
  margin: 5px 10px;
  width: 300px;
  height: 35px;
  border-radius: 5px;
  border: none;
  background-color: #e52639;
  color: white;
  cursor: pointer;
}

.add-btn:hover {
  opacity: 0.8;
}

.coin {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
h2 {
  margin-top: 70px;
}
</style>
