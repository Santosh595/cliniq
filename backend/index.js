import dotenv from 'dotenv'
dotenv.config();
import jwt from 'jsonwebtoken'
import http from 'http'
import express from 'express'
import { ApolloServer } from '@apollo/server'
import { gql } from 'graphql-tag'
import mongoose, { Model } from 'mongoose';
import {expressMiddleware} from '@as-integrations/express5'
import cors from 'cors'

import connectDB from './src/config/connection.js';
import { verifyAccessToken } from './src/utils/jwt.js';
import { typeDefs } from "./src/schemas/index.js";
import { resolvers } from "./src/resolvers/index.js"
import cookieParser from 'cookie-parser';
import User from './src/models/user.js';

import { Profile } from './src/models/profile.js';
import { Admin } from './src/models/admin.js'


connectDB();



const app = express();
//const httpServer = http.createServer(app); // later for web socket 

const server = new ApolloServer({
  typeDefs,
  resolvers,
//   context: ({ req }) => {
//     const authHeader = req.headers.authorization || "";
//     if (!authHeader.startsWith("Bearer ")) return {};

//     const token = authHeader.replace("Bearer ", "").trim();

//     try {
//       const payload = verifyAccessToken(token); // { id, role }
//       return { user: payload };
//     } catch (err) {
//       console.log("JWT verification failed:", err.message);
//       return {}; // user stays undefined if token invalid
//     }
//   },
});

await server.start();

app.use(
    '/graphql',
    cors(),
    cookieParser(),
    express.json(),
    expressMiddleware(server,{
    context: async ({ req }) => {
  const authHeader = req.headers.authorization || "";
  if (!authHeader.startsWith("Bearer ")) return { user: null };

  const token = authHeader.split(" ")[1].trim(); // get token after 'Bearer '
  if (!token) return { user: null };

  try {
    const decoded = jwt.verify(token, "accesssecret"); // { id, role }

    let Model;
    switch (decoded.role) {
      case "Profile":
        Model = Profile;
        break;
      case "Doctor":
        Model = Doctor;
        break;
      case "Admin":
        Model = Admin;
        break;
      default:
        Model = Profile;
    }

    const user = await Model.findById(decoded.id);
    if (!user) return { user: null };

    return { user }; // this is what requireRole uses
  } catch (err) {
    console.log("JWT verification failed:", err.message);
    return { user: null };
  }
}
  })
)

app.listen(process.env.PORT,()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})