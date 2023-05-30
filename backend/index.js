// Import packages
require("dotenv").config();
const PORT = process.env.PORT;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//routers
const listingRouter = require("./routes/listing");
const userRouter = require("./routes/user");

// Middlewares
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/listing", listingRouter);
app.use("/user", userRouter);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
