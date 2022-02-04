const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/auth",
    createProxyMiddleware({
      target: "https://127.0.0.1:5001/",
      changeOrigin: true,
      secure: false,
    })
  );
};
