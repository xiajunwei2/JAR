module.exports = {
    // baseUrl: 'https://xxx',
    publicPath:'./',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/phjr-manager-service':{
                target:'http://phjrservice.utools.club',
                changeOrigin:true,
                pathRewrite:{
                    '/phjr-manager-service':'/phjr-manager-service'
                }
            }
        }
    },
    configureWebpack: {
		module: {
			rules: [{
				test: /(\.(sc|sa|c|le)ss$|\.vue$)/,
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