module.exports = {
  devServer: {
    proxy: {
      '/ts': {
        target: 'http://192.168.1.15',
        ws: true,
        changeOrigin: true
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}