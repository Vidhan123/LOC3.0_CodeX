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
        return (data.data.data.authUser);
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
    getDoctors: async () => {
      const data = await axios.post(
        url,
        {
            query: `
            query{
              getDoctors{
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
                about
                location {
                  latitude
                  longitude
                }
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
    console.log(data.data.data.getDoctors);
    return data.data.data.getDoctors;
    },
    searchParticularDoctor: async (docId) => {
      const data = await axios.post(
        url,
        {
            query: `
            query{
              searchParticularDoctor(userId: "${docId}"){
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
                about
                location {
                  latitude
                  longitude
                }
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
    return data.data.data.searchParticularDoctor;
    },
    createAppointment: async (docId, date, description, pId) => {
      const data = await axios.post(
        url,
        {
            query: `
            mutation{
              createAppointment(appointmentInput: {
                doctorId: "${docId}",
                date: "${date}",
                description: "${description}",
                patientId: "${pId}",
              }){
                doctorId
                patientId
                _id
                date
                status
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
    return data.data.data.createAppointment;
    },
    uploadDoc: async (id, files) => {
      console.log(files);
      const postData = new FormData();
      postData.append('id', id);
      postData.append('file', files);
      const data = await axios.post(
        'http://localhost:5000/uploadDoc',
        postData,
    );
    console.log(data);
    return data;
    },
    searchDoctorByName: async (searchTerm) => {
      const data = await axios.post(
        url,
        {
            query: `
            query{
              searchDoctorByName(searchTerm: "${searchTerm}"){
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
                about
                location {
                  latitude
                  longitude
                }
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
        return data.data.data.searchDoctorByName;
    },
    searchDoctorBySpecialization: async (searchTerm) => {
      const data = await axios.post(
        url,
        {
            query: `
            query{
              searchDoctorBySpecialization(searchTerm: "${searchTerm}"){
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
                about
                location {
                  latitude
                  longitude
                }
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
        return data.data.data.searchDoctorBySpecialization;
    },
};

export default api;