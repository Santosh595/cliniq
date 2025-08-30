import { Profile } from "../models/profile.js";
import { requireRole } from "../utils/authGaurd.js";
import { Doctor } from "../models/doctor.js"

export const adminResolvers = {
    Query: {
        allUsers: async (_, __, { user } )=>{
            requireRole(user, ["Admin"]);
            return Profile.find();
        },
        allDoctors: async (_, __, { user }) => {
        requireRole(user, ["ADMIN"]);
        return Doctor.find();
    }
    },



}