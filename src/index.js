const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const db = require("./models/index");
const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
// #################################################
const morgan = require("morgan");
// #################################################

const setupAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // #################################################
  app.use(morgan("combined"));
  // app.get("bookingservice/api/v1/home", (req, res) => {
  //   return res.json({
  //     message: "Welcome to the home page of booking  service using middleware",
  //   });
  // });
  // app.get("/bookingservice/api/v1/home", (req, res) => {
  //   return res.json({
  //     message: "Welcome to the home page of booking service using middleware",
  //   });
  // });
  // // #################################################

  app.use("/bookingservice/api", apiRoutes); // http://localhost:3002/bookingservice/api
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }
  });
};

setupAndStartServer();
