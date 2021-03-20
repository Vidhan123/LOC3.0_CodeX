const UserSchema = `

    type Location {
        latitude: Int
        longitude: Int
    }

    input LocationInput {
        latitude: Float
        longitude: Float
    }

    type User {
        _id: ID!
        name: String
        phoneNo: String
        email: String!
        password: String
        role: String!
        age: Int
        sex: String
        specialization: String
        token: String
        about: String
        location: Location
    }


    input UserInput {
        _id: ID
        name: String!
        phoneNo: String
        email: String!
        password: String!
        role: String!
        age: Int
        sex: String
        specialization: String
        about: String
        location: LocationInput
    }
    
    input UpdateUserInput {
        _id: ID!
        name: String
        phoneNo: String
        email: String
        password: String
        role: String
        age: Int
        sex: String
        specialization: String
        about: String
        location: LocationInput
    }
`;

module.exports = {UserSchema};