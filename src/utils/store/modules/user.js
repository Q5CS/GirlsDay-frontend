import { login, logout, getUserInfo } from "@/api/user";
import { getMyWishes, getMyClaimedWishes } from "@/api/wish";
import { getToken, setToken, removeToken } from "@/utils/auth";

const user = {
  state: {
    token: getToken(),
    userinfo: null,
    wishes: null,
    claimedWishes: null
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER_DATA: (state, data) => {
      state.userinfo = data;
    },
    SET_MY_WISHES: (state, data) => {
      state.wishes = data;
    },
    SET_MY_CLAIMED_WISHES: (state, data) => {
      state.claimedWishes = data;
    }
  },

  actions: {
    // Token 直接登录
    LoginByToken({ commit }, token) {
      return new Promise(resolve => {
        // console.log("login by token:", token);
        commit("SET_TOKEN", token);
        setToken(token);
        resolve();
      });
    },

    // Oauth 登录
    LoginByOauth({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            commit("SET_TOKEN", response.token);
            setToken(response.token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(response => {
            if (!response) {
              // 由于mockjs 不支持自定义状态码只能这样hack
              reject("error");
            }

            commit("SET_USER_DATA", response);

            // 获取用户许下的心愿
            getMyWishes().then(response => {
              commit("SET_MY_WISHES", response.wishes);
            });

            // 获取用户认领的心愿
            getMyClaimedWishes().then(response => {
              commit("SET_MY_CLAIMED_WISHES", response.wishes);
            });

            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 设置用户信息
    SetUserInfo({ commit }, userInfo) {
      commit("SET_USER_DATA", userInfo);
    },

    // 登出
    LogOut({ commit, state }) {
      // console.log("LogOut");
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit("SET_TOKEN", "");
            // commit("SET_ROLES", []);
            removeToken();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      // console.log("FedLogOut");
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
