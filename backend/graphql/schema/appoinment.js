const AppointmentSchema = `

    type viewAppointment {
        _id: ID!
        patientId: ID!
        doctorId: User!
        description: String!
        date: String!
        status: String!
    }

    type Appointment {
        _id: ID!
        patientId: ID!
        doctorId: ID!
        description: String!
        date: String!
        status: String!
    }

    input AppointmentInput {
        patientId: ID!
        doctorId: ID!
        description: String!
        date: String!
    }

    type Response {
        msg: String!
    }

`

module.exports = {AppointmentSchema};