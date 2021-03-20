const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fuzzy = require('mongoose-fuzzy-searching');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    sex: {
      type: String,
    },
    specialization: {
      type: String
    },
    about: {
      type: String
    },
    location: {
      latitude : {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.plugin(fuzzy, {
  fields:
     ['specialization',
     'name']
  
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
