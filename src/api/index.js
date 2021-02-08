const managerRoutes = require("./manager");


const endPointsHandler = (app) => {
  app.use("/api/manager/", managerRoutes);
};

module.exports = { endPointsHandler };
