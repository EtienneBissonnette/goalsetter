const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//TODO: Create controller userHome

//@desc create User
//@route POST /api/users/
//@access Public
const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please provide every entries for user creation");
    }

    //check if user exists?
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      res.status(400);
      throw new Error("User already exists");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
      name: name,
      email: email,
      password: hashpassword,
    });

    //check if user was created successfully
    if (user) {
      res.status(201).send({
        name: user.name,
        email: user.email,
        _id: user.id,
        token: genJWT(user.id),
      });
    } else {
      res.status(400);
      throw new Error("User was not created successfully, invalid data");
    }
  } catch (error) {
    next(error);
  }
};

//@desc login User
//@route POST /api/users/login
//@access Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    //compare hashed password with input password
    if (user && bcrypt.compare(password, user.password)) {
      res.status(200).send({
        name: user.name,
        email: user.email,
        _id: user.id,
        token: genJWT(user.id),
      });
    } else {
      throw new Error("Invalid email or password provided");
    }
  } catch (error) {
    res.status(400);
    next(error);
  }
};

//@desc login User
//@route GET /api/users/me
//@access Private
const homeUser = async (req, res, next) => {
  try {
    const { _id, name, email } = await User.findById(req.user.id);
    res.status(200).json({ id: _id, name: name, email: email });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

//generate JWT with user ID + secret
const genJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { createUser, loginUser, homeUser };
