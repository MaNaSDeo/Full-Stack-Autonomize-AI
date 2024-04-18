import { type Request, type Response } from "express";
import axios from "axios";
import User from "../models/Users.models";

interface SearchQuery {
  [key: string]: RegExp | number | boolean | undefined;
}

const GIT_URL = "https://api.github.com/users";

const testController = async (req: Request, res: Response) => {
  const { ...queries } = req.query;

  try {
    const searchQuery: SearchQuery = {};

    Object.keys(queries).forEach((param) => {
      if (!isNaN(Number(queries[param]))) {
        searchQuery[param] = Number(queries[param]);
      } else if (typeof queries[param] === "boolean") {
        searchQuery[param] = queries[param] === "true";
      } else {
        searchQuery[param] = new RegExp(queries[param] as string, "i");
      }
    });

    const users = await User.find({ isDeleted: false, ...searchQuery });

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found matching the search criteria" });
    }

    res.status(200).json({ message: "Users found!", users });
  } catch (error) {
    res.status(500).json({ message: "Error searching for users", error });
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

const findMutualFollowers = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({
      username: new RegExp(`^${username}$`, "i"),
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const followingResponse = await axios.get(
      `${GIT_URL}/${username}/following`
    ); // Fetch the user's following lists from the GitHub API
    const followersResponse = await axios.get(
      `${GIT_URL}/${username}/followers`
    ); // Fetch the user's followers lists from the GitHub API

    const following = followingResponse.data.map(
      (followee: { login: string }) => followee.login
    );
    const followers = followersResponse.data.map(
      (follower: { login: string }) => follower.login
    );

    const mutualFollowers = followers.filter((follower: { login: string }) =>
      following.includes(follower)
    ); // Find mutual followers (users the given user follows who also follow them back)

    const updatedUser = await User.findOneAndUpdate(
      { username: new RegExp(`^${username}$`, "i") },
      {
        $set: { friends: mutualFollowers },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Mutual followers saved as friends",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to find mutual followers", error });
  }
};

const searchUsers = async (req: Request, res: Response) => {
  const { ...queries } = req.query;

  try {
    const searchQuery: SearchQuery = {};

    Object.keys(queries).forEach((param) => {
      if (!isNaN(Number(queries[param]))) {
        searchQuery[param] = Number(queries[param]);
      } else if (typeof queries[param] === "boolean") {
        searchQuery[param] = queries[param] === "true";
      } else {
        searchQuery[param] = new RegExp(queries[param] as string, "i");
      }
    });

    const users = await User.find({ isDeleted: false, ...searchQuery });

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found matching the search criteria" });
    }

    res.status(200).json({ message: "Users found!", users });
  } catch (error) {
    res.status(500).json({ message: "Error searching for users", error });
  }
};

export { testController, saveUser, findMutualFollowers, searchUsers };
