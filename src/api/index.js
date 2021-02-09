const adminRoutes = require("./admin");
const managerRoutes = require("./manager");


const endPointsHandler = (app) => {
  app.use("/api/admin/", adminRoutes);
  app.use("/api/manager/", managerRoutes);
};

module.exports = { endPointsHandler };
