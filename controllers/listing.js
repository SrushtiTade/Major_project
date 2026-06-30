const Listing = require("../models/listing.js");

// GET /listings
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
};

// GET /listings/new
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

// GET /listings/:id
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  res.render("listings/show", { listing });
};

// POST /listings
module.exports.createListing = async (req, res) => {
  let listingData = req.body.listing;
  const newListing = new Listing(listingData);
  newListing.owner = req.user._id;

  // If a file was uploaded via multer/cloudinary, use it
  if (req.file) {
    newListing.image = { url: req.file.path, filename: req.file.filename };
  } else if (typeof listingData.image === "string") {
    newListing.image = { url: listingData.image, filename: "listingimage" };
  }

  await newListing.save();
  req.flash("success", "New Listing Created Successfully! 🏠");
  res.redirect("/listings");
};

// GET /listings/:id/edit
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  res.render("listings/edit", { listing });
};

// PUT /listings/:id
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listingData = req.body.listing;
  const listing = await Listing.findById(id);

  Object.assign(listing, listingData);

  if (req.file) {
    listing.image = { url: req.file.path, filename: req.file.filename };
  } else if (typeof listingData.image === "string" && listingData.image) {
    listing.image = { url: listingData.image, filename: "listingimage" };
  }

  await listing.save();
  req.flash("success", "Listing Updated Successfully! ✏️");
  res.redirect(`/listings/${id}`);
};

// DELETE /listings/:id
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted Successfully! 🗑️");
  res.redirect("/listings");
};