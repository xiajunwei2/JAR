module.exports = {
	lintOnSave: false,
	productionSourceMap: false,
	devServer: {
		proxy: {
			'/auditsystem': {
				target: process.env.VUE_APP_PROXY_URL || 'http://124.70.157.102:9009',
				changeOrigin: true,
				pathRewrite: {
					'/auditsystem': '/auditsystem'
				}
			},
		}
	},
	configureWebpack: {
		module: {
			rules: [{
				test: /(\.(sc|sa|c)ss$|\.vue$)/,
				loader: 'px2vw-view-loader',
				query: {
					viewportWidth: 1920,
					viewportUnit: 'vw',
					minPixelValue: 1,
					decimal: 3
				}
			}]
		}
	}
} 
