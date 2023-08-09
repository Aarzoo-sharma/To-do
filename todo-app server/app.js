const express = require("express");
const session = require("express-session");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173","exp://192.168.1.5:19000"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "hello world",
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 90 },
    saveUninitialized: true,
  })
);
const userRoute = require("./routes/user");

app.use("/user", userRoute);

app.listen(3000, () => {
  console.log("server starts");
});
