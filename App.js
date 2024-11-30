require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const DB = require("./DB/db");
// Importing Routers

const userRouter = require("./ROUTER/user.routes");

app.use(express.json());

const corseOption = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corseOption));

// Routers

app.use("/users",userRouter)


DB().then(()=>{
    app.listen(process.env.PORT, () => {
      console.log(`Listen to the PORT ${process.env.PORT}`);
    });
})
