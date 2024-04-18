import { type Request, type Response } from "express";
import axios from "axios";
import User from "../models/Users.models";

const GIT_URL = "https://api.github.com/users";

const testController = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const existingUser = await User.findOne({
      username: new RegExp(`^${username}$`, "i"),
    }); // Check if the user already exists in the database

    if (existingUser) {
      return res
        .status(200)
        .json({ message: "User already exists", user: existingUser });
    }

    const response = await axios.get(`${GIT_URL}/${username}`); //Fetch data from Github API
    const userData = response.data;

    const newUser = new User({ ...userData, username: userData.login }); // Create a new user document

    await newUser.save(); // Save the user document to the database

    res.status(201).json({ message: "User saved successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: `Error fetching or saving user`, error });
  }
};

const saveUser = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const existingUser = await User.findOne({
      username: new RegExp(`^${username}$`, "i"),
    }); // Check if the user already exists in the database

    if (existingUser) {
      return res
        .status(200)
        .json({ message: "User already exists", user: existingUser });
    }

    const response = await axios.get(`${GIT_URL}/${username}`); //Fetch data from Github API
    const userData = response.data;

    const newUser = new User({ ...userData, username: userData.login }); // Create a new user document

    await newUser.save(); // Save the user document to the database

    res.status(201).json({ message: "User saved successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: `Error fetching or saving user`, error });
  }
};

export { testController, saveUser };
