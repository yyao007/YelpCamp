'use strict';

import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import flash from "connect-flash";
import bodyParser from "body-parser";
import LocalStrategy from "passport-local";
import methodOverride from "method-override";
import User from "./models/user";
import seedDb from "./seeds";

// require routes
import campgroundsRoutes from "./routes/campgrounds";
import commentsRoutes from "./routes/comments";
import indexRoutes from "./routes/index";

mongoose.connect("mongodb://localhost/yelpCamp", {useMongoClient: true});

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");

// seed the database
// seedDb();

// PASSPORT CONFIGURATION
app.use(session({
	secret: "I am YY for sure",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.currUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);

app.listen(2000, () => {
	console.log("YelpCamp Server listening on port 2000");
});
