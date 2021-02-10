const adminRoutes = require("./admin");
const managerRoutes = require("./manager");
const clerkRoutes = require("./clerk");


const endPointsHandler = (app) => {
  app.use("/api/admin/", adminRoutes);
  app.use("/api/manager/", managerRoutes);
  app.use("/api/clerk/", clerkRoutes);
};

module.exports = { endPointsHandler };
