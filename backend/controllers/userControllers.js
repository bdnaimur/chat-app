import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { tokenGenerator } from "../config/tokenGenerator.js";

export const registerUser = asyncHandler(async (req, res) => {
  // console.log("body", req.body);
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exits");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    const token = tokenGenerator({ email, id: user._id });
    res.status(201).json({
      user: {
        name,
        email,
        pic,
        id: user._id,
      },
      token,
    });
  } else {
    res.status(400);
    throw new Error("Faild to create user");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const isPasswordMatched = await user.matchPassword(password);

  if (user && isPasswordMatched) {
    const token = tokenGenerator({ email, id: user._id });
    res.status(201).json({
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
        pic: user.pic,
      },
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

export const users = asyncHandler(async (req, res) => {
     
    const user = await User.find({ });
  
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }
    if (user) {
        res.status(201).json({
          users: user
        });
      }

})

export const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

    console.log("req.user",req.user);
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

