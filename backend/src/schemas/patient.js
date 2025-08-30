import { gql } from "graphql-tag";

export const patientTypeDefs = gql`
    type Patient {
        id: ID!
        name: String!
        dob: String
        gender: String
        relation: String
        healthInfo: HealthInfo
    }

    type HealthInfo {
        boolGroup: String
        allergies: [String]
        medicalHistory: [String]
        currentMedications: [String]
    }
`;