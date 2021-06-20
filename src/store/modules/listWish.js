import {
    addWishApi,
    getAllWishApi,
    deleteWishApi,
} from '@/api/modules/listWish'

export default {
    namespaced: true,
    state: {
        listWish: [],
    },
    getters: {
        listWishGetter: (state) => state.listWish,
    },
    mutations: {
        setListWich (state, payload) {
            state.listWish = payload
        },
        removeWish (state, payload) {
            state.listWish = state.listWish.filter(item => {
                return item.id !== payload
            })
        },
        setAppListWish (state, payload) {
            state.listWish.push(payload)
        },
    },
    actions: {
        async addWishAction ({ commit }, payload) {
            var data = { id: payload }
            const serviceResponse = await addWishApi(data)
            if (serviceResponse.ok) {
                const params = { text: serviceResponse.message }
                window.getApp.$emit('SHOW_MESSAGE', params)
            } else {
                const params = { text: serviceResponse.message.text }
                window.getApp.$emit('SHOW_ERROR', params)
            }
        },
        async getAllWishAction ({ commit }) {
            const serviceResponse = await getAllWishApi()
            if (serviceResponse.ok) {
                commit('setListWich', serviceResponse.listWish)
            } else {
                console.log(serviceResponse)
                const params = { text: serviceResponse.message.text }
                window.getApp.$emit('SHOW_ERROR', params)
            }
        },
        async removeWishAction ({ commit }, payload) {
            const serviceResponse = await deleteWishApi(payload)
            if (serviceResponse.ok) {
                commit('removeWish', payload)
                console.log(serviceResponse)
                const params = { text: serviceResponse.message }
                window.getApp.$emit('SHOW_MESSAGE', params)
            } else {
                const params = { text: serviceResponse.message.text }
                window.getApp.$emit('SHOW_ERROR', params)
            }
        },
    },
}
