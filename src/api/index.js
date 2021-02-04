const homeRoutes = require("./apiHome");


const endPointsHandler = (app) => {
  app.use("/api/", homeRoutes);
};

module.exports = { endPointsHandler };
