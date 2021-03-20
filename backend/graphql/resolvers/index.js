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
    searchDoctor
  } = require('./user.js');

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
    searchDoctor: searchDoctor
  };