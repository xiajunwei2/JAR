import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

// export default new Vuex.Store({
// 	//本地存储持久化，避免刷新丢失state
// 	plugins: [createPersistedState({
// 		storage: window.sessionStorage
// 	})],
// 	state,
// 	mutations,
// 	actions,
// })
// export default store

const store = new Vuex.Store({
	//本地存储持久化，避免刷新丢失state
	plugins: [createPersistedState({
		storage: window.sessionStorage
	})],
	state,
	mutations,
	actions,
})

export default store