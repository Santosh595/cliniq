import { gql } from 'graphql-tag';

export const userTypeDefs = gql`
    type Profile{
        id: ID!
        name: String!
        email: String!
        phone: String
        role: String
        patients: [Patient]
    }

    extend type Query {
        me: Profile
    }

    extend type Mutation{
        addPatient( name: String!, dob: String, gender: String, relation: String): Patient!
    }
`;