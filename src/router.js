import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
     {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
      },
      {
        path: '/',
        redirect: '/a/apps',
      },
      {
        path: '/me',
        component: () => import('@/views/pages/Index'),
        meta: { requiresAuth: true },
        children: [
          {
            name: 'Aplicaciones agregadas',
            path: 'apps/added',
            component: () => import('@/views/content/componentDesarrollador/AplicacionesAgregadas'),
            beforeEnter: (to, from, next) => {
              if (parseInt(store.getters['authentication/userGetter'].rolId) === 2) {
                next()
              } else {
                next(false)
              }
            },
          },
          {
            name: 'Aplicaciones compradas',
            path: 'apps/buys',
            component: () => import('@/views/content/componentCliente/aplicaciones/AplicacionesCompradas'),
          },
          {
            name: 'Agregar aplicacion',
            path: 'app/add',
            component: () => import('@/views/content/componentDesarrollador/AgregarAplicacion'),
            beforeEnter: (to, from, next) => {
              if (parseInt(store.getters['authentication/userGetter'].rolId) === 2) {
                next()
              } else {
                next(false)
              }
            },
          },
          {
            name: 'Editar aplicacion',
            path: 'app/edit/:slug',
            component: () => import('@/views/content/componentDesarrollador/EditarAplicacion'),
            props: true,
            beforeEnter: (to, from, next) => {
              if (parseInt(store.getters['authentication/userGetter'].rolId) === 2) {
                next()
              } else {
                next(false)
              }
            },
          },
          {
            name: 'Lista deseos',
            path: 'list-heats',
            component: () => import('@/views/content/componentCompartidos/ListaDeseos'),
          },
        ],
      },
      {
        path: '/a',
        component: () => import('@/views/pages/Index'),
        children: [
          {
            name: 'Dasboard',
            path: '',
            component: () => import('@/views/content/Dashboard'),
            children: [
              {
                name: 'Todas las plicaciones',
                path: 'apps',
                components: {
                  apps: () => import('@/views/content/componentDashboard/AppsAll'),
                },
              },
              {
                name: 'Categorias',
                path: 'categories',
                components: {
                  categorys: () => import('@/views/content/componentDashboard/Categories'),
                },
              },
            ],
          },
          {
            name: 'Aplicaciones por categoría',
            path: ':slugCategory',
            component: () => import('@/views/content/categorias/ListaAplicacionesCategoria'),
            props: true,
          },
          {
            name: 'Detalle de la aplicación',
            path: 'app/:slug',
            component: () => import('@/views/content/componentCompartidos/DetalleAplicacion'),
            props: true,
          },
        ],
      },
  ],
})

if (localStorage.getItem('token') != null) {
  store.dispatch('authentication/checkToken')
}
var authenticated = store.getters['authentication/authenticatedGetter']
router.beforeEach(async (to, from, next) => {
  const routerProtected = await to.matched.some(record => record.meta.requiresAuth)
  if (routerProtected) {
    if (authenticated) {
      next()
    } else {
      next({
        name: 'Login',
      })
    }
  } else {
    next()
  }
})

export default router
