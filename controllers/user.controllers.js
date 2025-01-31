const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');

// function to register new user
const createUser = async (req, res) => {
  const { userName, email, password } = req.body;

  // checking if user has provided all the required details
  if (!(userName && email && password)) {
    return res.json({ message: 'Please Provide your details' });
  }

  try {
    // checking if the email provided exist already in the database
    const isRegisteredUser = await userModel.findOne({ email });

    if (isRegisteredUser) {
      return res.json({ message: 'Email Already in Use' });
    }

    // hashing user password

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // creating a new user
    const newUser = new userModel({
      userName,
      email,
      password: hashedPassword,
    });

    // saving the user data to database
    await newUser.save();
    res.json({ message: 'User Registered Successfully' });
  } catch (error) {
    res.json({ message: 'Something went wrong' });
  }
};

// function to Login a registered user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // checking if user has provided all the required details
  if (!(email && password))
    return res.json({ message: 'Please Provide your details' });

  // checking if the user exist in the database
  try {
    const isRegisteredUser = await userModel.findOne({ email });

    if (!isRegisteredUser) {
      return res
        .status(404)
        .json({ message: 'User does not exist, Please register' });
    }

    // checking if the provided password matched the password in database

    const isPasswordValid = bcrypt.compareSync(
      password,
      isRegisteredUser.password
    );

    if (!isPasswordValid) {
      return res.json({ message: 'Password not valid' });
    }

    // setting the user password to empty string to avoid being sent with the  response
    isRegisteredUser.password = '';

    // returning the user details without empty string as password

    return res
      .cookie('id', isRegisteredUser.id, { httpOnly: true })
      .status(200)
      .json({ isRegisteredUser });
  } catch (error) {
    res.json({ message: 'Something went wrong' });
  }
};

// function to delete a registered user
const deleteUser = async (req, res) => {
  const { email, password } = req.body;

  // checking if user has provided all the required details
  if (!(email && password))
    return res.json({ message: 'Please Provide your details' });

  // checking if the user exist in the database
  try {
    const isRegisteredUser = await userModel.findOne({ email });

    if (!isRegisteredUser) {
      return res.json({ message: 'User does not exist, Please register' });
    }

    // checking if the provided password matched the password in database
    const isPasswordValid = bcrypt.compareSync(
      password,
      isRegisteredUser.password
    );

    if (!isPasswordValid) {
      return res.json({ message: 'Password not valid' });
    }
    // find and delete the registered user details from the database
    await userModel.findOneAndDelete(email);
    return res.json({ message: 'User Deleted Successfully' });
  } catch (error) {
    res.json({ message: 'Something went wrong' });
  }
};

module.exports = { createUser, loginUser, deleteUser };
