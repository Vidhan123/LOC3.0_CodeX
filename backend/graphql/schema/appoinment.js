const AppointmentSchema = `

    type Appointment {
        _id: ID!
        patientId: ID!
        doctorId: ID!
        description: String!
        date: String!
        status: String!
    }

    input AppointmentInput {
        doctorId: ID!
        description: String!
        date: String!
    }

    type Response {
        msg: String!
    }

`

module.exports = {AppointmentSchema};