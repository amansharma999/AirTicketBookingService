const bodyParser = require("body-parser");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./models.index");
const { PORT } = require("./config/serverConfig");
const v1ApiRoutes = require("./routes/index");
const PORT = 3002;
const setupAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", v1ApiRoutes);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }
  });
};

setupAndStartServer();
