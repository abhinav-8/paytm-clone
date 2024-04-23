const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/index");
const cors = require("cors");
const { connect } = require("./config/serverConfig");
const app = express();

connect();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(8080, () => {
  console.log("server running at port 8080");
});
