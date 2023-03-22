const { createProxyMiddleware } = require('http-proxy-middleware')


module.exports = function (app){
    app.use(createProxyMiddleware('/api',{
        target:"http://35.189.83.153:8000/",
        changeOrigin : true,

    }))
}
