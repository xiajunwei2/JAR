'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // BASE_API:'"http://phjrservice.utools.club"',
    // BASE_API: '"http://service.cicba.cn"',
    BASE_API: '"http://124.70.157.102:9002"',
    BACKEND_URL: '"http://localhost:8081"',//后台地址`,
    proxyTable: {
        '/inclusive': {
            target: 'http://124.70.157.102:9002',
            changeOrigin: true,
            pathRewrite: {
                '/inclusive': '/inclusive'
            }
        }
    }
})
