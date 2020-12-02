module.exports = {
  productionSourceMap: false,
  pwa: {
    name: 'Школьный тренажер',
    themeColor: '#424242',
    manifestOptions: {
      start_url: `/`
    },
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      navigateFallback: '/index.html',
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp('/'),
          handler: 'NetworkFirst',
          options: {
            networkTimeoutSeconds: 20,
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 5,
              maxAgeSeconds: 60
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    },
    appleMobileWebAppCapable: 'yes'
  }
}
