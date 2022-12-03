import Home from "./components/Home.vue";
import SignUp from "./components/SignUp.vue";
import LogIn from "./components/LogIn.vue";
import Add from "./components/Add.vue";
import Update from "./components/Update.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    name: "Home",
    component: Home,
    path: "/",
  },
  {
    name: "SignUp",
    component: SignUp,
    path: "/sign-up",
  },
  {
    name: "LogIn",
    component: LogIn,
    path: "/login",
  },
  {
    name: "Add",
    component: Add,
    path: "/add",
  },
  {
    name: "Update",
    component: Update,
    path: "/update/:id",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
