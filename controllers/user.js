const User = require("../models/user.js");

// GET /signup
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup");
};

// POST /signup
module.exports.signup = (req, res, next) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email });

  User.register(newUser, password, (err, user) => {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("/signup");
    }
    req.login(user, (loginErr) => {
      if (loginErr) return next(loginErr);
      req.flash("success", `Welcome to WanderLust, ${username}! 🎉`);
      res.redirect("/listings");
    });
  });
};

// GET /login
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};

// POST /login (handled by passport — just the success callback)
module.exports.login = (req, res) => {
  req.flash("success", `Welcome back, ${req.user.username}! 👋`);
  const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

// GET /logout
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "You have been logged out.");
    res.redirect("/listings");
  });
};