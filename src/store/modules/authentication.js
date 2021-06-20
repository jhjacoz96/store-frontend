import router from '@/router'
import {
    loginApi,
    registerApi,
 } from '@/api/modules'

export default {
    namespaced: true,
    state: {
        token: '',
        user: '',
        authenticated: false,
    },
    getters: {
        tokenGetter: state => state.token,
        userGetter: state => state.user,
        authenticatedGetter: state => state.authenticated,
    },
    mutations: {
        getUser (state, payload) {
            if (payload === '') {
                state.token = ''
                state.user = ''
                state.authenticated = false
            } else {
                state.token = payload.token
                state.user = payload.user
                state.authenticated = true
            }
        },
    },
    actions: {
        async loginAction ({ commit }, payload) {
            const serviceResponse = await loginApi(payload)
            if (serviceResponse.ok) {
               commit('getUser', serviceResponse)
               localStorage.setItem('token', serviceResponse.token)
               localStorage.setItem('user', JSON.stringify(serviceResponse.user))
               localStorage.setItem('authenticated', true)
               if (parseInt(JSON.parse(localStorage.getItem('user')).rolId) === 2) {
                   router.push('/me/apps/added')
                   return serviceResponse
               } else {
                    router.push('/me/apps/buys')
                    return serviceResponse
               }
            } else {
                return serviceResponse
            }
        },
        async registerAction ({ commit }, payload) {
            const serviceResponse = await registerApi(payload)
            console.log(serviceResponse)
            if (serviceResponse.ok) {
                commit('getUser', serviceResponse)
                localStorage.setItem('token', serviceResponse.token)
                localStorage.setItem('user', JSON.stringify(serviceResponse.user))
                localStorage.setItem('authenticated', true)
                if (parseInt(JSON.parse(localStorage.getItem('user')).rolId) === 2) {
                    router.push('/me/apps/added')
                    return serviceResponse
                } else {
                     router.push('/me/apps/buys')
                     return serviceResponse
                }
             } else {
                 return serviceResponse
             }
        },
        checkToken ({ commit }) {
            const token = localStorage.getItem('token')
            if (token != null) {
                const user = JSON.parse(localStorage.getItem('user'))
                const authenticated = true
                const payload = {
                    token,
                    user,
                    authenticated,
                }
                commit('getUser', payload)
            } else {
                commit('getUser', '')
                router.push('/login')
            }
        },
        logoutAction ({ commit }, payload) {
            localStorage.clear()
            commit('getUser', '')
            if (payload !== '/a/apps') router.push('/a/apps')
        },
    },
}
