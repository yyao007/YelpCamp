var mongoose = require("mongoose");
var campSchma = new mongoose.Schema({
	name: String,
	price: String,
	img: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "comments"
		}
	]
}, {
	timestamps: {
		createdAt: "createdDate",
		updatedAt: "updatedDate"
	}
});

export default mongoose.model("campgrounds", campSchma);
