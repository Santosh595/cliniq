import { gql } from 'graphql-tag'

export const doctorTypeDefs = gql`
    extend type Query {
        myPatients: [Patient!]
    }
`;
