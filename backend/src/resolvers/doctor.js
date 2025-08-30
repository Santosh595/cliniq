import { requireRole  } from "../utils/authGaurd.js";
import { Profile } from "../models/profile.js";

export const doctorResolvers = {
    Query: {
        myPatients: async (_, __, { user }) =>{
            requireRole(user, ["DOCTOR"]);
            const doc =await Profile.findById(user.id).populate("patients");
            return doc?.patients || [];
        }
    }
};