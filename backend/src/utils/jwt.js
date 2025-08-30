import jwt from 'jsonwebtoken'
import { Profile } from '../models/profile.js';
import { Doctor } from '../models/doctor.js';
import { Admin } from '../models/admin.js';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "accesssecret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refreshsecret";

export const generateAccessToken = (user) =>{
    return jwt.sign({id: user._id?.toString?.() || user.id, role: user.role}, ACCESS_SECRET, { expiresIn: "30m"});
};

export const generateRefreshToken = (user) => {
    return jwt.sign({id: user._id?.toString?.() || user.id , role: user.role}, REFRESH_SECRET, { expiresIn: "7d"});
};

export const verifyAccessToken = (token) => jwt.verify(token, ACCESS_SECRET);

export const verifyRefreshToken = (token) => jwt.verify(token, REFRESH_SECRET);