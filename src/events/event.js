export default [
  {
    name: 'SHOW_MESSAGE',
    callback: function (params) {
      this.$toast.success(params.text, {
        theme: 'outline',
        position: 'bottom',
        duration: 5000,
      })
    },
  },
  {
    name: 'SHOW_ERROR',
    callback: function (params) {
      this.$toast.error(params.text, {
        theme: 'outline',
        position: 'bottom',
        duration: 5000,
        icon: {
          name: 'mdi-account',
          after: true, // this will append the icon to the end of content
        },
      })
    },
  },
  {
    name: 'LOADING',
    callback: function (flag) {
      this.$loading(flag)
    },
  },
]
