import { getStat } from "@/api/stat";

const state = {
  stat: {}
};

const mutations = {
  SET_STAT: (state, data) => {
    state.stat = data;
  }
};

const actions = {
  getStat({ commit }) {
    return new Promise((resolve, reject) => {
      getStat()
        .then(res => {
          commit("SET_STAT", res);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
