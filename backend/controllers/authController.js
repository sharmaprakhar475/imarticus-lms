const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { name, phone, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.json({ msg: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ name, phone, email, password: hashed });

  res.json({ msg: "Signup successful", user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ msg: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, "SECRET123");

  res.json({ msg: "Login successful", token, userId: user._id });
};

exports.getUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId });
  if (!user) return res.status(404).json({ msg: "User not found" });
  res.status(200).json({ msg: "User fetched successfully", user });
};
