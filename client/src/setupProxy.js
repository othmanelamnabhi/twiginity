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
  app.use(
    "/tweets",
    createProxyMiddleware({
      target: "https://127.0.0.1:5001/",
      changeOrigin: true,
      secure: false,
    })
  );

  // app.use(
  //   createProxyMiddleware("/websocket.io", {
  //     // <-- notice the pattern is not in use but in the proxy method
  //     target: "https://localhost:5001",
  //     ws: true,
  //     changeOrigin: true,
  //   })
  // );
};
