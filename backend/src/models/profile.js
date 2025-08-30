import mongoose, { Schema } from "mongoose";
import User from "./user.js";

const profileSchema = new Schema({
  patients: [{ type: Schema.Types.ObjectId, ref: "Patient" }]
});




export const Profile =
  mongoose.models.Profile || User.discriminator("Profile", profileSchema);


