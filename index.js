const express = require("express");
const createConnection = require("./configs/dbConnection");
const route = require("./routes/accessRoute");
const app = express();

require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/authorization", route);

app.listen(port, function (err) {
  if (!err) {
    console.log("Server is running in port", port);
    createConnection();
  }
});
