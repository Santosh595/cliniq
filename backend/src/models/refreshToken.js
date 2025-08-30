import mongoose from 'mongoose';

const {Schema, model} = mongoose;

const refreshTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    expiresAt: { type: Date, required: true}
},{ timestamps: true});

export const RefreshToken = model("RefreshToken", refreshTokenSchema);