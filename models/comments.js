var mongoose = require("mongoose");
var commentSchema = mongoose.Schema({
	text: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
}, {
	timestamps: {
		createdAt: "createdDate",
		updatedAt: "updatedDate"
	}
});


module.exports = mongoose.model("comments", commentSchema);