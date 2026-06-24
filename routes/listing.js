const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner } = require("../middleware.js");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

const normalizeImage = (listingData) => {
  if (typeof listingData.image === "string") {
    listingData.image = { url: listingData.image, filename: "listingimage" };
  }
  return listingData;
};

// Index
router.get("/", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
}));

// New form — must be logged in
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new");
});

// Show
router.get("/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  res.render("listings/show", { listing });
}));

// Create — must be logged in
router.post("/", isLoggedIn, validateListing, wrapAsync(async (req, res) => {
  let listingData = normalizeImage(req.body.listing);
  const newListing = new Listing(listingData);
  newListing.owner = req.user._id; // save who created it
  await newListing.save();
  req.flash("success", "New Listing Created Successfully! 🏠");
  res.redirect("/listings");
}));

// Edit form — must be logged in + owner
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  res.render("listings/edit", { listing });
}));

// Update — must be logged in + owner
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(async (req, res) => {
  let { id } = req.params;
  let listingData = normalizeImage(req.body.listing);
  await Listing.findByIdAndUpdate(id, listingData);
  req.flash("success", "Listing Updated Successfully! ✏️");
  res.redirect(`/listings/${id}`);
}));

// Delete — must be logged in + owner
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted Successfully! 🗑️");
  res.redirect("/listings");
}));

module.exports = router;