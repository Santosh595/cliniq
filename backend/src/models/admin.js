import { Schema } from "mongoose";
import User from "./user.js";

export const Admin = User.discriminator("Admin", new Schema({
  roleLevel: { type: String, enum: ["superadmin", "staff"], default: "staff" }
}));
