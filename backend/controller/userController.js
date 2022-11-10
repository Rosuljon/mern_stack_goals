import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../modals/userModel.js";

// @desc Register new user
// @route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please add all fields");
  }
  //ckeck if user exists
  const existUser = await User.findOne({ email });
  if (existUser) {
    res.status(400);
    throw new Error("user already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token : generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

// @desc Authenticate a user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token : generateToken(user._id)
    })
  }else{
    res.status(400);
    throw new Error("invalid credentials");
  }
  
});

// @desc Get user data
// @route GET /api/users/me
// @access private
const getMe = asyncHandler(async (req, res) => {
  const {_id, name, email } = await User.findById(req.user.id)
  res.status(200).json({
    id : _id,
    name,
    email
  })
});

// Generate Token
const generateToken = id => {
    return jwt.sign({ id },process.env.JWT_SECRET, {expiresIn: '30d'})
}

export { registerUser, getMe, loginUser };
