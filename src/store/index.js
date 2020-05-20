import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)


export default new Vuex.Store({

    state: {
        data: [],
    },
    getters: {
        tablGet(state) {
            return state.data
        },


    },
    actions: {

        asyncChangeData({commit}) {

            return axios('http://localhost:3000/cars', {
                method: 'GET'
            }).then(
                (response) => {

                    commit('changeData', response.data)
                }
            )

        },
    },


    mutations: {
        changeData(state, val) {
            state.data = val
        },
    },
    modules: {}
})
