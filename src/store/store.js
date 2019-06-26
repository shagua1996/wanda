import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { city } from "./modules/city"; //引入入模块
import { cinema } from "./modules/cinema"; //引入入模块
export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        city,
        cinema // 将模块暴露出去
    }
});