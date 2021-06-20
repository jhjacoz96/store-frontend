import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import authentication from './modules/authentication'
import app from './modules/app'
import category from './modules/category'
import cart from './modules/cart'
import listWish from './modules/listWish'
import buy from './modules/buy'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    authentication,
    app,
    category,
    cart,
    listWish,
    buy,
  },
})
