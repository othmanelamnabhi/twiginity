const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/auth",
    createProxyMiddleware({
      target: "http://127.0.0.1:50000/",
      changeOrigin: true,
      secure: false,
    })
  );
  app.use(
    "/tweets",
    createProxyMiddleware({
      target: "http://127.0.0.1:50000/",
      changeOrigin: true,
      secure: false,
    })
  );
};
