const UserSchema = `

    type Location {
        latitude: Int
        longitude: Int
    }

    input LocationInput {
        latitude: Int
        longitude: Int
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
        name: String
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