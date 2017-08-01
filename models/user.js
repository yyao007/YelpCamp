import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

var UserSchema = new mongoose.Schema({
	username: String,
	password: String
}, {
	timestamps: {
		createdAt: "createdDate",
		updatedAt: "updatedDate"
	}
});

UserSchema.plugin(passportLocalMongoose);
export default mongoose.model("User", UserSchema);