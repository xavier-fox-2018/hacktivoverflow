const routes = require("express").Router();

routes.use("/user", require("./user"));
routes.use("/question", require("./question"));
routes.use("/answer", require("./answer"));

// 404
routes.use((req, res) => {
  res.status(404).json({
    message: "Page not found"
  });
});

module.exports = routes;
