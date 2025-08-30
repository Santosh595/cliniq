const RatingSchema = new Schema({
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
  patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  score: { type: Number, min: 1, max: 5, required: true },
  comment: String,
}, { timestamps: true });

export const Rating = mongoose.model("Rating", RatingSchema);
