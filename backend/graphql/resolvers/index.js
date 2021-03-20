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
    searchDoctor,
    searchParticularDoctor,
  } = require('./user.js');

const {
  createAppointment,
  viewAppointment,
  cancelAppointment,
  changeStatus,
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
    searchDoctor: searchDoctor,
    searchParticularDoctor: searchParticularDoctor,
    //appointment
    createAppointment: createAppointment,
    viewAppointment: viewAppointment,
    cancelAppointment: cancelAppointment,
    changeStatus: changeStatus,
  };