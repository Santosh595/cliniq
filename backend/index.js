import dotenv from 'dotenv'
dotenv.config();

import http from 'http'
import express from 'express'
import { ApolloServer } from '@apollo/server'
import { gql } from 'graphql-tag'
import mongoose from 'mongoose';
import {expressMiddleware} from '@as-integrations/express5'
import cors from 'cors'

import connectDB from './src/config/connection.js';




connectDB();

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
})

const User = mongoose.model('User', userSchema);

const typeDefs = gql`
type User{
    id: ID!
    name: String
    email: String
}

type Query{
    users: [User!]!
    user(id: ID!): User
}

type Mutation{
    createUser(name: String!, email: String!): User!
}
`;

const resolvers = {
    Query: {
        users: async() => await User.find(),
        user: async(_,args) => await User.findById(args.id),
    },

    Mutation: {
        createUser: async(_,{name,email}) =>{
            const user = new User({name,email});
            return await user.save();
        },
    }
};

const app = express();
//const httpServer = http.createServer(app); // later for web socket 

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

await server.start();

app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server)
)

app.listen(process.env.PORT,()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})