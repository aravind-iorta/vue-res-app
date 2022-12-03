import { createApp } from "vue";
// import "./style.css";
import App from "./App.vue";
import router from "./routers";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "material-design-icons-iconfont/dist/material-design-icons.css";

const vuetify = createVuetify({
  components,
  directives,
});
createApp(App).use(vuetify).use(router).mount("#app");
