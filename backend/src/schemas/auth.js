import { gql } from 'graphql-tag'

export const authTypeDefs = gql`
    type AuthPayLoad {
        accessToken: String!
        refreshToken: String!
        user: Profile!
    }
    
    extend type Mutation{
        signup(name: String!, email: String!, phone: String!, password: String!, role: String) : AuthPayLoad!
        login(email:String!, password: String!): AuthPayLoad!
        refreshToken(token: String!): AuthPayLoad!
        logout(token: String!): Boolean!

    }
`