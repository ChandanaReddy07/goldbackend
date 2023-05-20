const mongoose = require("mongoose");
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./router/user");

const app = express();


// Middle wares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



// Routes

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("My worldooo!");
});

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("DB IS CONNECTED");
  });



app.listen(3001, () => {
  console.log(`jebhdhbkd ${3001}`);
});
