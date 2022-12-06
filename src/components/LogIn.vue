<template>
  <div class="login">
    <div>
      <img class="logo" src="../assets/app-logo.jpg" />
      <h2>Login</h2>
    </div>

    <div class="register">
      <input
        type="email"
        v-model.trim="login.email"
        placeholder="Enter a email"
        id="email"
      />
      <input
        v-model.trim="login.password"
        type="password"
        placeholder="Enter a password"
        id="password"
      />
      <button @click="logIn">LogIn</button>
      <router-link to="/sign-up" class="reg">Sign up</router-link>
    </div>
  </div>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    absolute
    top
    color="success"
    outlined
    right
  >
    Login is successfully
  </v-snackbar>
</template>

<script>
import axios from "axios";
import { API_URL } from "../config/constant";
export default {
  name: "LogIn",
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      snackbar: false,
      text: "My timeout is set to 2000.",
      timeout: 2000,
    };
  },
  methods: {
    logIn() {
      axios.post(`${API_URL}/user/login`, { ...this.login }).then((e) => {
        if (e.status === 200) {
          this.snackbar = true;
          const user = JSON.stringify(e.data.data);
          localStorage.setItem("userInfo", user);

          this.$router.push({ name: "Home" });
        } else {
          alert("Email and Password is in-correct");
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
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.register input {
  display: block;
  width: 300px;
  padding: 10px 20px;
  margin: 20px 0px;
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
</style>
