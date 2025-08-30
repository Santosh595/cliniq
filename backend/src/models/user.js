import { model, Schema } from "mongoose";

const options = { discriminatorKey: "role", timestamps: true};

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    adress: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
    },
    password: {
        type: String
    }
},options);

const User = model("User", userSchema);

export default User;