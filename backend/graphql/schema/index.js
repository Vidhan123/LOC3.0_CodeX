const { buildSchema } = require('graphql');
const { UserSchema } = require('./user.js');
const { AppointmentSchema } = require('./appoinment.js');

const buildschema =  buildSchema(`
    ${UserSchema}

    ${AppointmentSchema}

    type rootQuery {
        
        authUser(email: String!, password: String!): User!
        getUserProfile: User!
        getUsers: [User!]!
        getUserById(userId: ID!): User!
        getDoctors: [User!]!
        searchDoctorByName(searchTerm: String!): [User!]
        searchDoctorBySpecialization(searchTerm: String!): [User!]
        searchParticularDoctor(userId: ID!): User!

        viewAppointment(user_id: ID!): [viewAppointment!]!
        cancelAppointment(appointment_id: ID!): Response!
        changeStatus(appointment_id: ID!): Response!
        getAllAppointments(user_id: ID!) : [viewAppointment!]!
    }

    type rootMutation {
        registerUser(userInput: UserInput!): User!
        updateUserProfile(userInput: UpdateUserInput!): User!
        updateUser(userId: ID!, userInput: UpdateUserInput!): User!
        deleteUser(userId: ID!): User!

        createAppointment(appointmentInput: AppointmentInput!): Appointment!
    }

    schema {
        query: rootQuery
        mutation: rootMutation
    }
`);

module.exports = buildschema;