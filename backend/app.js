const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");

require("dotenv").config();

//bejme require dhe inicializojme databse
const lidhumeDb = require("./db");
lidhumeDb();

//inicializojme app
const app = express();

//Midlewares
app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(express.json());
app.use(cookies());
app.use(express.static("public"));

//Routes
app.use("/api/users", require("./routes/users"));

app.get("/", (req, res) => {
  res.send("homepage");
});

//process.env.PORT
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log("serveri eshte ne porten", PORT));
