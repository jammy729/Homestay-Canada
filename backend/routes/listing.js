const express = require("express");
const ListingModel = require("../models/Listing");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await ListingModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new recipe
router.post("/", async (req, res) => {
  const listing = new ListingModel({
    _id: new mongoose.Types.ObjectId(),
    address: req.body.address,
    city: req.body.city,
    price: req.body.price,
    description: req.body.description,
    coverImage: req.body.coverImage,
    imageGallery: req.body.imageGallery,
  });
  console.log(listing);

  try {
    const result = await listing.save();
    res.status(201).json({
      createdListing: {
        address: result.address,
        city: result.city,
        price: result.price,
        description: result.description,
        coverImage: result.coverImage,
        imageGallery: result.imageGallery,
        _id: result._id,
      },
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

router.put("/update", async (req, res) => {
  const updatedData = req.body;
  const id = req.body.id;

  try {
    const updatedListing = await ListingModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    if (!updatedListing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }

    return res.status(200).json({ success: true, data: updatedListing });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
});

router.get("/detail/:id", async (req, res) => {
  const paramsid = String(req.params.id);

  ListingModel.find({ address: paramsid })
    .then(function (result) {
      res.send(result);
    })
    .catch(function (err) {
      res.status(400).json({ success: false });
    });
});

router.get("/admin/:id", async (req, res) => {
  const paramsid = String(req.params.id);

  await ListingModel.findById(paramsid)
    .then(function (result) {
      res.status(200).json({ success: true, data: result });
    })
    .catch(function (err) {
      res.status(400).json({ success: false });
    });
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await ListingModel.findByIdAndRemove(id).exec();
  res.send("Deleted");
});

module.exports = router;
