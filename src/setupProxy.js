const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/client_api', {
      target: 'http://localhost:3000/client_api/',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/client_api': '/',
      },
    })
  );
};
