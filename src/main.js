import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueRx from "vue-rx";

Vue.use(VueRx);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
