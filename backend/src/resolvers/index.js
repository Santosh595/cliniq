import { authResolvers } from "./auth.js";
import { userResolvers } from "./user.js";
import { doctorResolvers } from "./doctor.js";
import { adminResolvers } from "./admin.js";

export const resolvers = [
  authResolvers,
  userResolvers,
  doctorResolvers,
  adminResolvers
];
