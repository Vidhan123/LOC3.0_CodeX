const User = require('../../models/user.js');
const {loggedin, admin} = require('../../utils/verifyUser');
const generateToken = require('../../utils/generateToken.js');   
const fuzzy = require('mongoose-fuzzy-search');

//Auth user & get token
// Public
const authUser = async (args, { req, redis }) => {
  try {
    const user = await User.findOne({ email: args.email });
    console.log(user);
    if (user && (await user.matchPassword(args.password))) {
      return {
        ...user._doc,
        token: generateToken(user._id),
      };
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Register a new user
// Public
const registerUser = async (args, { req, redis }) => {
  try {
    const userExists = await User.findOne({ email: args.userInput.email });

    if (userExists) {
      throw new Error('User already exists');
    }

    const user = await User.create({
      name: args.userInput.name,
      email: args.userInput.email,
      password: args.userInput.password,
      role: args.userInput.role,
    });

    if (user) {
      return {
        ...user._doc,
        token: generateToken(user._id),
      };
    } else {
      throw new Error('Invalid user data');
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Get user profile
// Private
const getUserProfile = async (args, { req, redis }) => {
  try {
    // if (loggedin(req)) {
      const user = await User.findById(req.user._id).select('-password');

      if (user) {
        return {
          ...user._doc,
        };
      } else {
        throw new Error('User not found');
      }
    // }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Update user profile
// Private
const updateUserProfile = async (args, { req, redis }) => {
  try {
    // if (loggedin(req)) {
      const user = await User.findById(args.userInput._id);

      if (user) {
        user.name = args.userInput.name || user.name;
        user.email = args.userInput.email || user.email;
        user.phoneNo = args.userInput.phoneNo || user.phoneNo;
        user.age = args.userInput.age || user.age;
        user.sex = args.userInput.sex || user.sex;
        user.specialization = args.userInput.specialization || user.specialization;
        user.role = args.userInput.role || user.role;
        user.about = args.userInput.about || user.about;
        user.location = args.userInput.location || user.location;
        if (args.userInput.password) {
          user.password = args.userInput.password;
        }
        const updatedUser = await user.save();
        return {
          ...updatedUser._doc,
          password: null,
          token: generateToken(updatedUser._id),
        };
      } else {
        throw new Error('User not found');
      }
    // }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Get all users
// Private/Admin
const getUsers = async (args, { req, redis }) => {
  try {
    // if (admin(req)) {
      const users = await User.find({}).select('-password');
      return users;
    // }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getDoctors = async (args, {req, redis}) => {
  try {
      const doctors = await User.find({role: "doctor"});
      if(doctors) {
        return doctors
      } else {
        res.status(404);
        console.log("No doctors");
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// Delete user
// Private/Admin
const deleteUser = async (args, { req, redis }) => {
  try {
    // if (admin(req)) {
      const user = await User.findById(args.userId);

      if (user) {
        await user.remove();
        return { msg: 'User removed' };
      } else {
        throw new Error('User not found');
      }
    // }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Get user by ID
// Private/Admin
const getUserById = async (args, { req, redis }) => {
  try {
    // if (admin(req)) {
      const user = await User.findById(args.userId).select('-password');

      if (user) {
        return user;
      } else {
        throw new Error('User not found');
      }
    // }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Update user
// Private/Admin
const updateUser = async (args, { req, redis }) => {
  try {
    // if (admin(req)) {
      const user = await User.findById(args.userId);

      if (user) {
        user.name = args.userInput.name || user.name;
        user.email = args.userInput.email || user.email;
        user.phoneNo = args.userInput.phoneNo || user.phoneNo;
        user.isAdmin = args.userInput.isAdmin || user.isAdmin;

        const updatedUser = await user.save();

        return {
          ...updatedUser._doc,
          password: null,
        };
      } else {
        throw new Error('User not found');
      }
    // }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const searchDoctorByName = async (args, {req}) => {
  try {
    // if(loggedin(req)) {
      const doctors = await User.fuzzySearch(args.searchTerm);
      let x = [];
      doctors.forEach(element => {
        if(element.role=="doctor") {
          x.push(element);
        }
      });
      return x;
    // } else {
    //   throw new Error('User not found');
    // }  
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const searchDoctorBySpecialization = async (args, {req}) => {
  try{
    // if(loggedin(req)) {
      const doctors = await User.find({role: "doctor", specialization: args.searchTerm});
      if(doctors) {
        return doctors;
      } else {
        console.log('Doctor not found!!');
      }  
    // } else {
    //   throw new Error('User not found');
    // // }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const searchParticularDoctor = async (args, {req}) => {
  try {
    // if(loggedin(req)) {
      let doctor = await User.findById(args.userId);
      if(doctor.role == 'doctor') {
        return doctor;
      } else {
        console.log('Doctor not found!!');
      }
    // } else {
    //   throw new Error('User not found');
    // }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports =  {
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
  searchParticularDoctor
};
