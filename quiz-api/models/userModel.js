const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  cell: {
    type: String,
    required: [true, "Please provide your cell number"],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true
  },
  // totalQuizAttempt: “”,
  // totalQuizCompleted: “”,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confim your password"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  active: Boolean,
  profileImg: String,
  isOpenQuiz: Boolean,
  openQuiz: String,
  // attempQuiz: [
  //     {
  //         quizId: “”,
  //         quizProgress: “”,
  //         result: “”,
  //         marks: 00
  //     }
  // ]
});

const User = mongoose.model("User", userSchema);

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = User;
