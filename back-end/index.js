// * --- importing ---
const express = require("express");
const database = require("./config/database.js");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const path = require("path");
const fs = require('fs')
const config = require("./config/config");
const session = require('express-session');
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const errorHandler = require("./middleware/errorHandler.js");

// * --- set up the database ---
database.connect();

// * --- set up the server ---
const app = express();
app.listen(process.env.PORT, () => console.log("http://localhost:" + process.env.PORT));

// * --- Logging With morgan ---
const accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/express.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms [:date]'));
// app.use(morgan('combined'));

// * --- set up session ---
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

// ! ______ Passport Set Up | Initialize Passport Library ______
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// !  ______ Google AUTH ______
passport.use(new GoogleStrategy({
  clientID: config.googleStrategy.CLIENT_ID,
  clientSecret: config.googleStrategy.CLIENT_SECRET,
  callbackURL: config.googleStrategy.UrlCallBack
},
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

// * --- middleware functions ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true
}));

// * --- Set Up Routes ---
app.use("/", require("./Routes/google.routes.js"));
app.use("/api", require("./Routes/auth.routes.js"));
app.use("/api/employee", require("./Routes/employee.routes.js"));
app.use("/api/service", require("./Routes/service.routes.js"));
app.use("/api/fonction", require("./Routes/fonction.routes.js"));

// * --- Error Handler ---
app.use(errorHandler);

// ! --- page not found ---
app.use("*", (req, res) => {
  res.status(404).json({ error: "The page you are looking for may have possibly not existed." });
});
