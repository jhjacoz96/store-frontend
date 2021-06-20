import {
    createBuyApi,
    getAllBuyApi,
} from '@/api/modules'

export default {
    namespaced: true,
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {
        async createBuyAction ({ commit }, payload) {
            const serviceResponse = await createBuyApi(payload)
            if (serviceResponse.ok) {
                localStorage.setItem('cart', '')
                const params = { text: serviceResponse.message.text }
                window.getApp.$emit('SHOW_MESSAGE', params)
                return serviceResponse
            } else {
                const params = { text: serviceResponse.message.text }
                window.getApp.$emit('SHOW_ERROR', params)
                return serviceResponse
            }
        },
        async getAllAction ({ commit }, payload) {
            const serviceResponse = await getAllBuyApi()
            if (serviceResponse.ok) {
                return serviceResponse
            } else {
                const params = { text: serviceResponse.message.text }
                window.getApp.$emit('SHOW_ERROR', params)
            }
        },
    },
}
