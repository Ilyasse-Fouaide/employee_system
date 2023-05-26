const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get('/success', (req, res) => {
  res.status(200).json({
    message: "Successfuy Loged In",
    user: req.user
  });
  console.log(req.user);
});

router.get('/error', (req, res) => {
  res.status(400).json({
    error: true,
    message: "Log in Failed"
  })
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.ORIGIN,
  }),
);

router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    res.redirect(`${process.env.ORIGIN}/login`);
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) { return next() };
  return res.status(401).json({ error: "Unauthorized." });
}

module.exports = router
