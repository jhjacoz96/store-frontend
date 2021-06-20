import { getAllCategoryApi } from '@/api/modules'

export default {
    namespaced: true,
    state: {
        categorys: [],
    },
    getters: {
        categorysGetter: (state) => state.categorys,
    },
    mutations: {
        setCategory (state, payload) {
            state.categorys = payload
        },
    },
    actions: {
        async getAllAction ({ commit }, payload) {
            const serviceResponse = await getAllCategoryApi()
            if (serviceResponse.ok) {
                commit('setCategory', serviceResponse.category)
            } else {
                const params = { text: serviceResponse.message }
                window.getApp.$emit('SHOW_ERROR', params)
            }
        },
    },
}
