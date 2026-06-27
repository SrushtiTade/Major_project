const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.js");
const { saveRedirectUrl } = require("../middleware.js");

// Show signup form
router.get("/signup", (req, res) => {
  res.render("users/signup");
});

// Handle signup
router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email });

  User.register(newUser, password, (err, user) => {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("/signup");
    }
    passport.authenticate("local")(req, res, () => {
      req.flash("success", `Welcome to WanderLust, ${username}! 🎉`);
      res.redirect("/listings");
    });
  });
});

// Show login form
router.get("/login", (req, res) => {
  res.render("users/login");
});

// Handle login
router.post("/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", `Welcome back, ${req.user.username}! 👋`);
    const redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }
);

// Handle logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "You have been logged out.");
    res.redirect("/listings");
  });
});

module.exports = router;

