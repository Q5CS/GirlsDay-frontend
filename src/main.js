import Vue from "vue";
import App from "./App.vue";
import router from "./utils/router";
import store from "./utils/store";
import { Toast } from "vant";
import "normalize.css";
import "./assets/css/global.css";
import waterfall from "vue-waterfall2";
Vue.use(waterfall);
import LightTimeline from "vue-light-timeline";
Vue.use(LightTimeline);

Vue.config.productionTip = false;

function newVue() {
  new Vue({
    router,
    store,
    created() {
      this.$store.dispatch("stat/getStat");
    },
    render: h => h(App)
  }).$mount("#app");
}

// 有 token：说明已经登录，需要获取用户信息
if (store.getters.token) {
  Toast.loading({
    duration: 0,
    mask: true,
    message: "获取用户信息中..."
  });
  store
    .dispatch("GetUserInfo")
    .then(() => {
      Toast.clear();
      newVue();
    })
    .catch(() => {
      store.dispatch("FedLogOut");
      Toast.clear();
      newVue();
    });
} else {
  newVue();
}
