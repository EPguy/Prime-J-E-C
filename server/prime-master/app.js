var express = require("express");
var app = express();
var cors = require("cors");
var mysql = require("mysql2/promise");
const session = require("express-session");
const models = require("./models/index.js");
const cookieParser = require("cookie-parser");
const secretObj = require("./config/jwt");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// database connection ===============================================================

models.sequelize
  .sync()
  .then(() => {
    console.log(" DB 연결 성공");
  })
  .catch(err => {
    console.log("연결 실패");
    console.log(err);
  });

// configuration ===============================================================

app.set('jwt-secreet', secretObj.secret)

app.set("port", process.env.PORT || 3001);

app.use(cookieParser());
app.use(cors());

var userRouter = require("./routes/user");
var adminRouter = require("./routes/admin");

//  ===============================================================

app.use("/admin", adminRouter);
app.use("/auth", userRouter);
app.get("/", () => {});

app.listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});
