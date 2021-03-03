const managerRoutes = require("./manager");
const clerkRoutes = require("./clerk");
const customerRoutes = require("./customer");

const endPointsHandler = (app) => {
  app.use("/api/manager/", managerRoutes);
  app.use("/api/clerk/", clerkRoutes);
  app.use("/api/customer/", customerRoutes);
};

module.exports = { endPointsHandler };
