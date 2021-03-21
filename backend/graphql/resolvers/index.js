const  {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getDoctors,
    deleteUser,
    getUserById,
    updateUser,
    searchDoctorByName,
    searchDoctorBySpecialization,
    searchParticularDoctor,
  } = require('./user.js');

const {
  createAppointment,
  viewAppointment,
  cancelAppointment,
  changeStatus,
  getAllAppointments,
} = require('./appointment.js')

  module.exports = {
    //users
    authUser: authUser,
    registerUser: registerUser,
    getUserProfile: getUserProfile,
    updateUserProfile: updateUserProfile,
    getUsers: getUsers,
    getDoctors: getDoctors,
    deleteUser: deleteUser,
    getUserById: getUserById,
    updateUser: updateUser,
    searchDoctorByName: searchDoctorByName,
    searchDoctorBySpecialization: searchDoctorBySpecialization,
    searchParticularDoctor: searchParticularDoctor,
    //appointment
    createAppointment: createAppointment,
    viewAppointment: viewAppointment,
    cancelAppointment: cancelAppointment,
    changeStatus: changeStatus,
    getAllAppointments: getAllAppointments
  };