const User = require("../models/user.js");

module.exports.signUpForm = (req, res) => {
  res.render("users/signup.ejs");
}

module.exports.createUser = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ username, email });
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser, (err) => {
        if (err) {
          return next();
        }
        req.flash("success", "Welcome to wanderlust");
        res.redirect("/listings");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }


module.exports.loginForm = (req, res) => {
  res.render("users/login.ejs");
}

module.exports.loginUser = async (req, res) => {
    req.flash("success", "Welcome to your account");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
  }

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "successfully logged out");
    res.redirect("/listings");
  });
}

//module.exports.
//module.exports.
//module.exports.
//module.exports.