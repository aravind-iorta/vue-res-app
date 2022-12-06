<template>
  <div class="container">
    <div>
      <img class="logo" src="../assets/app-logo.jpg" />
      <h2>Signup Page</h2>
    </div>
    <div class="register">
      <input
        type="text"
        v-model.trim="register.name"
        placeholder="Enter a name"
        id="name"
      />
      <input
        type="email"
        v-model.trim="register.email"
        placeholder="Enter a email"
        id="email"
      />
      <input
        v-model.trim="register.password"
        type="password"
        placeholder="Enter a password"
        id="password"
      />
      <button @click="signUp">Sign Up</button>
      <router-link to="/login" class="reg">Already,Have a account!</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_URL } from "../config/constant";
export default {
  name: "SignUp",
  data() {
    return {
      register: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signUp() {
      axios.post(`${API_URL}/user/register`, this.register).then((e) => {
        if (e.status === 201) {
          //   alert("signup is successfully");

          this.register = {
            name: "",
            email: "",
            password: "",
          };
          this.$router.push({ name: "LogIn" });
          //   const user = JSON.stringify(e.data);
          //   localStorage.setItem("userInfo", user);
        }
      });
    },
  },
  mounted() {
    let user = localStorage.getItem("userInfo");
    if (user) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>

<style scoped>
.logo {
  width: 200px;
}
.register input {
  display: block;
  width: 300px;
  padding: 10px 20px;
  margin: 20px 20px;
  border-radius: 5px;
}
.register button {
  padding: 5px 10px;
  height: 35px;
  width: 300px;
  border-radius: 5px;
  border: none;
  background-color: #e52639;
  color: white;
  cursor: pointer;
}

.register button:hover {
  opacity: 0.8;
}

.reg {
  display: flex;
  justify-content: right;
  cursor: pointer;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
