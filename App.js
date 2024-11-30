require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const DB = require("./DB/db");
const cookieParser = require("cookie-parser");

// Importing Routers
const userRouter = require("./ROUTER/user.routes");
const captainRouter = require("./ROUTER/captain.routes");

app.use(cookieParser());
app.use(express.json());

const corseOption = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corseOption));

// Routers

app.use("/users", userRouter);
app.use("/captains", captainRouter);
 
DB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening to the PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
