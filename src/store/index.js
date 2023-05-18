import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        navURLListen: '/',
        count: 1,
    },
    getters: {},
    mutations: {
        navURLListen(state, path) {
            state.navURLListen = path
        }
    },
    actions: {},
    modules: {}
})
