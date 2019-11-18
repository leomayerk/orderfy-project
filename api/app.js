const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/config");
const indexRoute = require("./packages/index");
const usersRoute = require("./packages/users/routes");

const url = config.bd_string;
const options = {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 5,
  useNewUrlParser: true
};

mongoose.connect(url, options);
mongoose.set("useCreateIndex", true);

mongoose.connection.on("error", err => {
  console.log("Erro na conexão do banco de dados" + err);
});

mongoose.connection.on("disconnected", () => {
  console.log("aplicação desconectada do bd");
});

mongoose.connection.on("connected", () => {
  console.log("aplicação conectada corretamente");
});

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users/", usersRoute);

app.all("/", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.listen(3000);

module.exports = app;
