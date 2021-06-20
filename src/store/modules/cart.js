export default {
    namespaced: true,
    state: {
        cart: [],
    },
    getters: {
        cartGetter: (state) => state.cart,
        priceTotalGetter: (state) => {
          var priceTotal = 0
          state.cart.forEach(item => {
              priceTotal += parseInt(item.price)
          })
          return priceTotal
        },
        countItemsGetter: (state) => state.cart.length,
    },
    mutations: {
        setItem (state, payload) {
            var exits = state.cart.find(item => {
              return item.id === payload.id
            })
            if (!exits) {
                state.cart.push(payload)
                localStorage.setItem('cart', JSON.stringify(state.cart))
                const params = { text: 'Aplicación agregada al carrito' }
                window.getApp.$emit('SHOW_MESSAGE', params)
            } else {
                const params = { text: 'Ya ha agregado esta aplicación' }
                window.getApp.$emit('SHOW_ERROR', params)
            }
        },
        getCart (state, payload) {
            state.cart = payload
        },
        removeItem (state, payload) {
          var index = state.cart.indexOf(payload)
          state.cart.splice(index, 1)
          localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        removeCart (state) {
            state.cart = []
        },
    },
    actions: {
        addToCartAction ({ commit }, payload) {
            commit('setItem', payload)
        },
        removeFromCartAction ({ commit }, payload) {
            commit('removeItem', payload)
            const params = { text: 'Aplicación removida del carrito' }
            window.getApp.$emit('SHOW_MESSAGE', params)
        },
        getCartAction ({ commit }) {
            if (localStorage.getItem('cart')) {
                const cart = JSON.parse(localStorage.getItem('cart'))
                commit('getCart', cart)
            }
        },
    },
}
