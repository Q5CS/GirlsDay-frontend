import Vue from "vue";
import Router from "vue-router";
import store from "@/utils/store";
import { menu } from "@/menu.js";
import { Toast } from "vant";

Vue.use(Router);

// 暴力解决 NavigationDuplicated
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new Router({
  mode: "history",
  routes: menu,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    if (store.getters.userinfo && store.getters.userinfo.id) {
      next();
    } else {
      // 是否还没获取用户信息？是的话拉取就行了
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
            next();
          })
          .catch(() => {
            Toast.clear();
          });
        next();
      } else {
        // 没 token 或者获取不到用户信息
        store.dispatch("FedLogOut").then(() => {
          next({
            path: "/user/login",
            query: {
              redirect: to.fullPath
            } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          });
        });
      }
    }
  } else {
    next();
  }
});

export default router;
