import express from "express";
import http from "http";
import passport from "passport";
import config from "./config/index"
import bodyParser from "body-parser";
import cors from "cors"
import path from "path"
import v1 from "./routes/v1.routes";
import v2 from "./routes/v2.routes";
import dbConnection from "./config/dbConnection";

const app = express();


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());
app.options("*", cors());

app.use(passport.initialize());
// include passport stratagy
require("./config/passport").v1(passport)
require("./config/passport").v2(passport)

app.use("/", express.static(path.join(__dirname, "public")));

//router
app.use("/v1",v1);
app.use("/v2",v2);


app.get("/", (req, res) => {
    return res.send("user service working")
})

var server = http.createServer(app)
dbConnection((done) => {
    if (done) {
    server.listen(config.PORT, function () {
        console.log('\x1b[34m%s\x1b[0m', `server is running on port ${config.PORT}`);
      });
    }
  })


