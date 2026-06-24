const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const { saveRedirectUrl } = require("../middleware.js");

// ── Signup ────────────────────────────────────────────────────

// Show signup form
router.get("/signup", (req, res) => {
  res.render("users/signup");
});

// Handle signup
router.post("/signup", wrapAsync(async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);  
      req.flash("success", `Welcome to WanderLust, ${username}! 🎉`);
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
}));



// ── Login ─────────────────────────────────────────────────────

// Show login form
router.get("/login", (req, res) => {
  res.render("users/login");
});

// Handle login using passport
router.post("/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", `Welcome back, ${req.user.username}! 👋`);
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }
);

// ── Logout ────────────────────────────────────────────────────
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "You have been logged out.");
    res.redirect("/listings");
  });
});

module.exports = router;