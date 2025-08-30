import { gql } from "graphql-tag";

export const adimnTypeDefs = gql`
    extend type Query {
        allUsers: [Profile!]
        allDoctors: [Profile!]
    }
`;
