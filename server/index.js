// Import packages
require("dotenv").config();
const PORT = process.env.PORT;

const express = require("express");
const listingRouter = require("./routes/listing");
const mongoose = require("mongoose");
const cors = require("cors");

// Middlewares
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/listing", listingRouter);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
});

// connection
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
