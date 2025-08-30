import { requireRole } from "../utils/authGaurd.js";
import { Profile } from "../models/profile.js";
import Patient from "../models/patient.js";

export const userResolvers = {
  Query: {
    me: async (_, __, { user }) => {
      console.log("Context user:", user);
      requireRole(user, []);

      if (!user) return null;

      // Fetch profile and populate patients
      const profile = await Profile.findById(user._id)
        .populate("patients")
        .lean(); // returns plain JS objects

      // Optional: ensure each patient has string id
      profile.patients = profile.patients.map((p) =>
        p ? { ...p, id: p._id.toString() } : null
      );

      return {
        ...profile,
        id: profile._id.toString(), // GraphQL expects 'id' as string
      };
    },
  },

  Mutation: {
    addPatient: async (_, { name, dob, gender, relation }, { user }) => {
      requireRole(user, ["USER"]);

      const patient = await Patient.create({
        name,
        dob,
        gender,
        relation,
        createdBy: user._id,
      });

      await Profile.findByIdAndUpdate(user._id, {
        $push: { patients: patient._id },
      });

      return { ...patient.toObject(), id: patient._id.toString() };
    },
  },
};
