import express from "express";
import passport from "passport";
import User from "../models/user";
const router = express.Router();

// ROOT ROUTE
router.get("/", function (req, res) {
	res.render("home");
});

// ==============================================================
// AUTH ROUTES
// ==============================================================

// show register form
router.get("/register", (req, res) => {
	res.render("register");
});

// sign up user
router.post("/register", (req, res) => {
	let newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user) => {
		if (err) {
			console.log(err);
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, () => {
			req.flash("success", "Welcome to YelpCamp, " + user.username + "!");
			res.redirect("/campgrounds");
		});
	});
});

// Login form
router.get("/login", (req, res) => {
	res.render("login");
});

// Login the user
router.post("/login", passport.authenticate("local", {
	failureRedirect: "/login",
	failureFlash: true
}), (req, res) => {
	req.flash("success", "Welcome back " + req.user.username + "!");
	res.redirect("/campgrounds");
});

// Logout route
router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success", "Logged out successfully!");
	res.redirect("/campgrounds");
});

export default router;
