const { buildSchema } = require('graphql');
const { UserSchema } = require('./user.js');

const buildschema =  buildSchema(`
    ${UserSchema}

    type rootQuery {
        authUser(email: String!, password: String!): User!
        getUserProfile: User!
        getUsers: [User!]!
        getUserById(userId: ID!): User!
        getDoctors: [User!]!
        searchDoctor(searchTerm: String!): [User!]
    }

    type rootMutation {
        registerUser(userInput: UserInput!): User!
        updateUserProfile(userInput: UpdateUserInput!): User!
        updateUser(userId: ID!, userInput: UpdateUserInput!): User!
        deleteUser(userId: ID!): User!
    }

    schema {
        query: rootQuery
        mutation: rootMutation
    }
`);

module.exports = buildschema;