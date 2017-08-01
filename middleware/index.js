import Comments from "../models/comments";
import Campgrounds from "../models/campgrounds";


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "Please login first");
	res.redirect("/login");
}

function hasCommentPermission(req, res, next) {
	if (req.isAuthenticated()) {
		Comments.findById(req.params.comment_id, (err, comment) => {
			if (err) {
				req.flash("error", "Campground not found");
				res.redirect("back");
			} else {
				if (comment.author.id.equals(req.user._id)) {
					return next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "Please login first");
		res.redirect("back");
	}
}

function hasCampgroundPermission(req, res, next) {
	if (req.isAuthenticated()) {
		Campgrounds.findById(req.params.id, (err, campground) => {
			if (err) {
				req.flash("error", "Campground not found");
				res.redirect("back");
			} else {
				if (campground.author.id.equals(req.user._id)) {
					return next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "Please login first");
		res.redirect("back");
	}
}

export { isLoggedIn, hasCommentPermission, hasCampgroundPermission };