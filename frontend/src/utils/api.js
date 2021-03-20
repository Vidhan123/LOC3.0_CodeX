import axios from 'axios';
import React, { useContext, useState }  from 'react';

const url = 'http://localhost:5000/graphql';

const api = {
    authUser: async (email, password) => {
        const data = await axios.post(
            url,
            {
              query: `
              query {
                authUser(email: "${email}", password: "${password}"){
                  _id
                  name
                  phoneNo
                  email
                  password
                  role
                  age
                  sex
                  specialization
                  token
                }
              }
            `,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
        );
        console.log(data);
        return (data);
    },
    registerUser: async (name, phoneNo, email, password, isAdmin, role, sex, age, specialization) => {
        const data = await axios.post(
            url,
            {
                query: `
                mutation{
                  registerUser(userInput: {
                    name: "${name}",
                    password: "${password}",
                    phoneNo: "${phoneNo}",
                    email: "${email}",
                    role: "${role}",
                    sex: "${age}",
                    age: ${age},
                    specialization: "${specialization}"
                  }) {
                    _id
                  name
                  phoneNo
                  email
                  password
                  role
                  age
                  sex
                  specialization
                  token
                  }
                }
                `,
            },
            {
                headers: {
                  'Content-Type': 'application/json',
                },
              },
        );
        return data; 
    },
};

export default api;