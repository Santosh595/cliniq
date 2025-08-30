import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import User from "../models/user.js";
import { Profile } from "../models/profile.js";
import { Admin } from "../models/admin.js";
import { Doctor } from "../models/doctor.js";
import { RefreshToken } from "../models/refreshToken.js";

const ROLE_INPUT_TO_DISCR = {
  USER: "Profile",
  DOCTOR: "Doctor",
  ADMIN: "Admin",
};

export const authResolvers = {
  Mutation: {
    signup: async (_, { name, email, phone, password, role }) => {
      const existing = await User.findOne({ email });
      if (existing) throw new Error("Email already registered");

      const hashed = await bcrypt.hash(password, 10);
      const targetRole = ROLE_INPUT_TO_DISCR[(role || "USER").toUpperCase()] || "Profile";

      let created;
      if (targetRole === "Doctor") {
        created = await Doctor.create({ name, email, phone, password: hashed });
      } else if (targetRole === "Admin") {
        created = await Admin.create({ name, email, password: hashed });
      } else {
        created = await Profile.create({ name, email, phone, password: hashed });
      }

      const accessToken = generateAccessToken(created);
      const refreshToken = generateRefreshToken(created);

      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await RefreshToken.create({ token: refreshToken, user: created._id, expiresAt });

      return { accessToken, refreshToken, user: created };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Invalid credentials");

      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new Error("Invalid credentials");

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await RefreshToken.create({ token: refreshToken, user: user._id, expiresAt });

      return { accessToken, refreshToken, user };
    },

    refreshToken: async (_, { token }) => {
      const stored = await RefreshToken.findOne({ token });
      if (!stored) throw new Error("Refresh token revoked or not found");

      try {
        const payload = verifyRefreshToken(token);
        const user = await User.findById(payload.id);
        if (!user) throw new Error("User not found");

        await RefreshToken.deleteOne({ token });

        const newAccess = generateAccessToken(user);
        const newRefresh = generateRefreshToken(user);
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        await RefreshToken.create({ token: newRefresh, user: user._id, expiresAt });

        return { accessToken: newAccess, refreshToken: newRefresh, user };
      } catch {
        await RefreshToken.deleteOne({ token }).catch(() => {});
        throw new Error("Invalid refresh token");
      }
    },

    logout: async (_, { token }) => {
      const deleted = await RefreshToken.deleteOne({ token });
      return !!deleted.deletedCount;
    },
  },
};
