const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign({ id: user.id, roles: user.roles }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.showRegister = (req, res) => res.render("auth/register");
exports.showLogin = (req, res) => res.render("auth/login");

exports.register = async (req, res) => {
  const { name, email, password, roles } = req.body;

  //   console.log(name,email,password,roles);
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists. Please login." });
    }

    const newUser = await User.create({ name, email, password, roles });
    const token = generateToken(newUser);

    // res.json({
    //   token,
    //   user: {
    //     id: newUser._id,
    //     name: newUser.name,
    //     roles: newUser.roles,
    //   },
    // });
    res.redirect("/auth/login");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // console.log(req.user);
  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    // 👇 Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // // 👇 Redirect or send JSON
    if (user.roles === "customer") {
      res.redirect("/ticket/create"); // Or return res.json() if using frontend JS
    } else if (user.roles === "agent") {
      res.redirect("/assigned");
    } else {
      res.redirect("/admin/dashboard");
    }
    // res.status(200).json({message:"Login SuccessFully"})
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logout = async (req, res) => {
 

  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  res.redirect("/auth/login"); // or '/auth/login' if that's the path
};
