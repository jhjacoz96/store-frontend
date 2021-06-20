import {
    createAppApi,
    getAllAppsApi,
    getAllAppDevApi,
    getAppApi,
    serchAppApi,
} from '@/api/modules'

export default {
    namespaced: true,
    state: {
        apps: [],
        appsDev: [],
        app: {},
    },
    getters: {
        appsGetter: (state) => state.apps,
        appsDevGetter: (state) => state.appsDev,
        appGetter: (state) => state.app,
    },
    mutations: {
        setApps (state, payload) {
            state.apps = payload
            /* state.apps.forEach(element => {
                element.image = `${urlImg}${element.image}`
            }) */
        },
        setAppsDev (state, payload) {
            state.appsDev = payload
            /* state.appsDev.forEach(element => {
                element.image = `${urlImg}${element.image}`
            }) */
        },
        setApp (state, payload) {
            state.app = payload
        },
    },
    actions: {
        async getAllAction ({ commit }, payload) {
            const serviceResponse = await getAllAppsApi(payload)
            if (serviceResponse.ok) {
                commit('setApps', serviceResponse.products.apps)
                return serviceResponse.products
            } else {
                const params = { text: serviceResponse.message }
                window.getApp.$emit('SHOW_ERROR', params)
            }
        },
        async createAction ({ commit }, payload) {
            const serviceResponse = await createAppApi(payload)
            return serviceResponse
        },
        async getAllDevAction ({ commit }, payload) {
            const serviceResponse = await getAllAppDevApi()
            if (serviceResponse.ok) {
                commit('setAppsDev', serviceResponse.product)
            } else {
                const params = { text: serviceResponse.message }
                window.getApp.$emit('SHOW_ERROR', params)
            }
        },
        async getAppAction ({ commit }, payload) {
            const serviceResponse = await getAppApi(payload)
            if (serviceResponse.ok) {
                // commit('setApp', serviceResponse.product);
                return serviceResponse
            } else {
                const params = { text: serviceResponse.message.text }
                window.getApp.$emit('SHOW_ERROR', params)
            }
        },
        async searchAppAction ({ commit }, payload) {
            const serviceResponse = await serchAppApi(payload)
            console.log(serviceResponse)
            if (serviceResponse.ok) {
                return serviceResponse.products
            } else {
                const params = { text: serviceResponse.message.text }
                window.getApp.$emit('SHOW_ERROR', params)
            }
        },
    },
}
