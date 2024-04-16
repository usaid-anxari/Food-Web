import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check the user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "This user is Doesn't exist",
      });
    }
    // password Match
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
    // Generate token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: "Internal server Error" });
  }
};

// create user token

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN);
};

// Create User

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    // Check user existins
    if (exists) {
      return res.json({
        success: false,
        message: "This user is already exists",
      });
    }
    // check user Validation
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    // checking for password
    if (password.length < 8) {
      return res.json({ success: false, message: "Password lenght minimam 8" });
    }
    // user password hashing
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name: name,
      email: email,
      password: passwordHash,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: "Internal server Error" });
  }
};

export { loginUser, createUser };
