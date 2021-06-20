<template>
  <v-app>
    <dashboard-core-app-bar />
    <!-- <dashboard-core-drawer /> -->
    <!--<dashboard-core-drawer-cart />-->
    <dashboard-core-view />
    <dashboard-core-footer />
  </v-app>
</template>

<script>
  export default {
    name: 'DashboardIndex',

    components: {
      DashboardCoreAppBar: () => import('./components/core/AppBar'),
      // DashboardCoreDrawer: () => import('./components/core/Drawer'),
      DashboardCoreView: () => import('./components/core/View'),
      DashboardCoreFooter: () => import('./components/core/Footer'),
      /* DashboardCoreDrawerCart: () => import('@/views/content/aplicaciones/Carrito'), */
    },

    data: () => ({
      expandOnHover: false,
      items: [
        { title: 'Home', icon: 'mdi-view-dashboard' },
        { title: 'About', icon: 'mdi-forum' },
      ],
    }),
  }
</script>
