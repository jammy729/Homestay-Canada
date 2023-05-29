const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: false,
  },
  imageGallery: [
    {
      type: String,
      required: true,
    },
  ],
  date: { type: Date, default: Date.now },
});

const Listing = mongoose.model("listing", ListingSchema);
module.exports = Listing;
