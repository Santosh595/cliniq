import { gql } from "graphql-tag"
import { authTypeDefs } from "./auth.js";
import { userTypeDefs } from "./user.js";
import { patientTypeDefs } from "./patient.js";
import { doctorTypeDefs } from "./doctor.js";
import { adimnTypeDefs } from "./admin.js";

const base = gql`
    type Query {_empty: String}
    type Mutation {_empty: String}
`;

export const typeDefs = [ base, authTypeDefs, userTypeDefs, patientTypeDefs, doctorTypeDefs, adimnTypeDefs];