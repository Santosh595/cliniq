import { model, Schema } from "mongoose";

const patientSchema  = new Schema({
    name: {
        type: String,
        required: true
    },
    dob: Date,
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    relation: {
        type: String,
        required: true,
    },
    healthInfo: {
        bloodGroup: String,
        allergies: [String],
        medicalHistory: [String],
        currentMedications: [String],
    },
},{ timestamps: true });



const Patient = model("Patient", patientSchema);

export default Patient;