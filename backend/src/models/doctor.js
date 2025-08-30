import { Schema } from "mongoose";
import User from "./user.js";

export const Doctor = User.discriminator("Doctor", new Schema({
    specialization: {
        type: String,
        required: true,
    },
    qualifications: [String],
    experience: { type: Number},
    hospital: String,
    availability: [{
        day: String,
        startTime: String,
        endTime: String,
    }],
    ratings: [{ type: Schema.Types.ObjectId, ref: "Rating"}]
}))