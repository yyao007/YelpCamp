import express from "express";
import Campgrounds from "../models/campgrounds";
import {isLoggedIn, hasCampgroundPermission} from "../middleware";
const router = express.Router();

//=====================================
// Campgrounds Routes
//=====================================

// INDEX, show all campgrounds
router.get("/", (req, res) => {
	Campgrounds.find({}, (err, camps) => {
		if (err) {
			res.send(err);
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: camps});
		}
	});
});

// NEW, show the form for creating campground
router.get("/new", isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});

// CREATE a new campground
router.post("/", isLoggedIn, (req, res) => {
	req.body.campground.author = {
		id: req.user._id,
		username: req.user.username
	};
	Campgrounds.create(req.body.campground, (err, camp) => {
		if (err) {
			req.flash("error", "Database error");
			console.log(err);
			res.redirect("back");
		} else {
			req.flash("success", "Created campground successfully!");
			// console.log("Created: " + camp);
			res.redirect("/campgrounds/" + camp._id);
		}
	});
});

// SHOW a campground
router.get("/:id", (req, res) => {
	Campgrounds.findById(req.params.id).populate("comments").exec((err, camp) => {
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			res.render("campgrounds/show", {camp: camp});
		}
	});
});

// EDIT campground route
router.get("/:id/edit", hasCampgroundPermission, (req, res) => {
	Campgrounds.findById(req.params.id, (err, campground) => {
		if (err) {
			res.redirect("/campgrounds");
		} else {
			res.render("campgrounds/edit", {campground: campground});
		}
	});
});

// UPDATE campground route
router.put("/:id", hasCampgroundPermission, (req, res) => {
	Campgrounds.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground) => {
		if (err) {
			req.flash("error", "Database error");
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Updated campground successfully!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DESTROY campground route
router.delete("/:id", hasCampgroundPermission, (req, res) => {
	Campgrounds.findByIdAndRemove(req.params.id, (err) => {
		if (err) {
			console.log(err);
			req.flash("error", "Database error");
			res.redirect("back");
		} else {
			req.flash("success", "Deleted campground successfully!");
			res.redirect("/campgrounds");
		}
	});
});

export default router;
