<template>
  <Header />
  <div class="coin">
    <h2>Add Restaurant</h2>
    <v-card>
      <div class="add-res">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter the name"
          v-model="addRestaurant.name"
        />

        <input
          type="text"
          name="address"
          id="address"
          placeholder="Enter the address"
          v-model="addRestaurant.address"
        />
        <input
          type="text"
          name="contact"
          id="contact"
          placeholder="Enter the contact"
          v-model="addRestaurant.contact"
        />
        <input
          type="file"
          name="picture"
          @change="file"
          id="picture"
          accept="image/png, image/jpeg, image/bmp"
        />
        <button class="add-btn" @click="add">Add</button>
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./Header.vue";
export default {
  name: "Add",
  components: {
    Header,
  },
  data() {
    return {
      addRestaurant: {
        name: "",
        address: "",
        contact: "",
        file: "",
      },
      rules: [
        (value) =>
          !value ||
          value.size < 1000000 ||
          "picture size should be less than 1 MB!",
      ],
    };
  },
  methods: {
    file(e) {
      let currentFile = e.target.files[0];

      this.toBase64(currentFile);
    },
    toBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.addRestaurant.file = reader.result;
      };
    },

    add() {
      axios
        .post("http://localhost:3000/restaurants", { ...this.addRestaurant })
        .then((e) => {
          if (e.status === 201) {
            // alert("added");

            this.addRestaurant = {
              name: "",
              address: "",
              contact: "",
              file: "",
            };
            this.$router.push({ name: "Home" });
            //   const user = JSON.stringify(e.data);
            //   localStorage.setItem("userInfo", user);
          }
        });
    },
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
