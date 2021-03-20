const AppointmentSchema = `

    type Appointment {
        _id: ID!
        patientId: ID!
        doctorId: ID!
        date: String!
        status: String!
    }

    input AppointmentInput {
        doctorId: ID!
        date: String!
    }

    type Response {
        msg: String!
    }

`

module.exports = {AppointmentSchema};