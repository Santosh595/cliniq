import mongoose, { Schema } from "mongoose";

const AppointmentSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
  date: { type: Date, required: true },
  reason: String,
  status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" },
  notes: String
}, { timestamps: true });

export const Appointment = mongoose.model("Appointment", AppointmentSchema);
