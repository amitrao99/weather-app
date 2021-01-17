const route = require("express").Router();

route.use("/form-weather", require("./form-weather"));
route.use("/standard", require("./standard"));
route.use("/metric", require("./metric"));
route.use("/imperial", require("./imperial"));

route.use("/compare", require("./compare"));

route.use("/history", require("./history"));
exports = module.exports = {
  route,
};
