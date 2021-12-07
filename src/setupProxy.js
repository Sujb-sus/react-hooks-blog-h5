const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/client_api', {
      target: 'http://localhost:3000/client_api/', // 设置目标服务器host
      secure: false,
      changeOrigin: true, // 是否需要改变原始主机头为目标URL
      pathRewrite: {
        '^/client_api': '/', // 重写目标url路径，将client_api前缀去掉
      },
    })
  );
};
