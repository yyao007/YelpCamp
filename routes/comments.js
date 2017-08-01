import express from "express";
import Campgrounds from "../models/campgrounds";
import Comments from "../models/comments";
import {isLoggedIn, hasCommentPermission} from "../middleware";
const router = express.Router({mergeParams: true});

// ==========================================================
// COMMENTS ROUTES
// ==========================================================

// NEW form for comment
router.get("/new", isLoggedIn, (req, res) => {
	Campgrounds.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log(err);
			res.redirect("/campgrounds/" + req.params.id);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

// CREATE a new comment
router.post("/", isLoggedIn, (req, res) => {
	Campgrounds.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log(err);
			req.flash("error", "Database error");
			res.redirect("/campgrounds/" + req.params.id);
		} else {
			let newComment = {
				text: req.body.text,
				author: {
					id: req.user._id,
					username: req.user.username
				}
			};
			Comments.create(newComment, (err, comment) => {
				if (err) {
					console.log(err);
					req.flash("error", "Database error");
					res.redirect("back");
				} else {
					// add username and id to comment
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Created comment successfully");
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

// EDIT comment form
router.get("/:comment_id/edit", hasCommentPermission, (req, res) => {
	Comments.findById(req.params.comment_id, (err, comment) => {
		if (err) {
			console.log(err);
			res.redirect("/campgrounds/" + req.params.id);
		} else {
			res.render("comments/edit", {
				campground_id: req.params.id,
				comment: comment
			});
		}
	});
});

// UPDATE comment route
router.put("/:comment_id", hasCommentPermission, (req, res) => {
	Comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, c) => {
		if (err) {
			console.log(err);
			res.redirect("back");
		} else {
			req.flash("success", "Updated comment successfully");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DESTROY comment route
router.delete("/:comment_id",hasCommentPermission, (req, res) => {
	Comments.findByIdAndRemove(req.params.comment_id, err => {
		if (err) {
			console.log(err);
			res.redirect("back");
		} else {
			req.flash("success", "Deleted comment successfully")
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

export default router;