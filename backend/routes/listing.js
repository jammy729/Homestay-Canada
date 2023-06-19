const express = require("express");
const ListingModel = require("../models/Listing");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await ListingModel.find({}).sort({ date: -1 }).limit(4);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/city", async (req, res) => {
  let { city } = req.query;

  // Set city to blank if "All" is selected
  if (city === "All") {
    city = "";
  }

  try {
    let query = {};

    if (city) {
      query = { city };
    }
    const result = await ListingModel.find(query).sort({ date: -1 }).limit();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/rental", async (req, res) => {
  try {
    const city = req.query.city;
    const query = { accommodationType: "rental" };

    if (city && city !== "All") {
      query.city = city;
    }

    const result = await ListingModel.find(query).sort({ date: -1 }).limit();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/homestay", async (req, res) => {
  try {
    const city = req.query.city;
    const query = { accommodationType: "homestay" };

    if (city && city !== "All") {
      query.city = city;
    }

    const result = await ListingModel.find(query).sort({ date: -1 }).limit();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/detail", async (req, res) => {
  const address = req.query.address;
  const id = req.query.id;

  try {
    const result = await ListingModel.findOne({ address: address, _id: id });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ success: false });
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
    accommodationType: req.body.accommodationType,
  });

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
        accommodationType: req.body.accommodationType,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/update", async (req, res) => {
  const updatedData = req.body;
  const id = req.body.id;

  try {
    const listing = await ListingModel.findById(id);

    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }
    const updatedImageGallery = [...updatedData.imageGallery];

    listing.address = updatedData.address;
    listing.city = updatedData.city;
    listing.price = updatedData.price;
    listing.description = updatedData.description;
    listing.coverImage = updatedData.coverImage;
    listing.imageGallery = updatedImageGallery;
    listing.accommodationType = updatedData.accommodationType;

    const updatedListing = await listing.save();

    res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      data: updatedListing,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
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

  try {
    await ListingModel.findByIdAndRemove(id).exec();
    res.send("Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
