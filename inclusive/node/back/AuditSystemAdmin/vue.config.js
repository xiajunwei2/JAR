module.exports = {
	lintOnSave: false,
	productionSourceMap: false,
	devServer: {
		proxy: {
			'/inclusive': {
				target: 'http://124.70.157.102:9008',
				changeOrigin: true,
				pathRewrite: {
					'/inclusive': '/inclusive'
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
