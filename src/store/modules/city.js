import * as Types from "../mutations-type"; // 引入常量文件
let state = {
    city: {}
};
let getters = {
    City: function(state) {
        return state.city;
    }
};
let mutations = {
    [Types.SET_CITY]: function(state, newCity) {
        state.city = newCity;
    }
};
let actions = {
    actCity: function({ commit }, newCity) {
        commit(Types.SET_CITY, newCity);
    }
};

export const city = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};