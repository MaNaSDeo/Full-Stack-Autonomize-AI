import { type Request, type Response } from "express";
import axios from "axios";
import User from "../models/Users.models";
import mongoose, { type SortOrder } from "mongoose";

interface SearchQuery {
  [key: string]: RegExp | number | boolean | undefined;
}

const GIT_URL = "https://api.github.com/users";

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

    const userResponse = await axios.get(`${GIT_URL}/${username}`); //Fetch data from Github API
    const userData = userResponse.data;

    const reposResponse = await axios.get(`${GIT_URL}/${username}/repos`); //Fetch repos details
    const repoData = reposResponse.data.map((repo: any) => ({
      html_url: repo.html_url,
      description: repo.description,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      visibility: repo.visibility,
      language: repo.language,
      default_branch: repo.default_branch,
      size: repo.size,
      id: repo.owner.id,
      name: repo.name,
    }));

    const followersResponse = await axios.get(
      `${GIT_URL}/${username}/followers`
    ); //Fetch followers details
    const followersData = followersResponse.data.map((follower: any) => ({
      username: follower.login,
      id: follower.id,
      avatar_url: follower.avatar_url,
    }));

    const newUser = new User({
      ...userData,
      username: userData.login,
      repos: repoData,
      followersData,
    }); // Create a new user document

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
  const { page, limit, isDeleted, ...queries } = req.query;

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

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments({
      isDeleted: false,
      ...searchQuery,
    });
    const numOfPages = Math.ceil(totalUsers / limit);

    let users = await User.find({ isDeleted: false, ...searchQuery })
      .skip(skip)
      .limit(limit);

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found matching the search criteria" });
    }

    res.status(200).json({ message: "Users found!", users, numOfPages });
  } catch (error) {
    res.status(500).json({ message: "Error searching for users", error });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const deletedUser = await User.findOneAndUpdate(
      {
        username: new RegExp(`^${username}$`, "i"),
      },
      { $set: { isDeleted: true } },
      { new: true }
    ); // Find the user and mark them as deleted (soft delete)

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Error searching for users", error });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  const { location, blog, bio, ...otherFields } = req.body;

  const userSchemaFields = Object.keys(User.schema.paths);

  const unknownFields = Object.keys(otherFields).filter(
    (field) => !userSchemaFields.includes(field)
  );

  if (unknownFields.length > 0) {
    return res.status(400).json({
      message: "Invalid fields in request body",
      unknownFields,
    });
  } // Check if client have sent some unkown fields to update

  if (req.body.hasOwnProperty("username") || req.body.hasOwnProperty("_id")) {
    return res.status(400).json({ message: "Cannot update username or _id" });
  } // Check if the request body contains username or _id

  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: new RegExp(`^${username}$`, "i") },
      {
        $set: {
          location,
          blog,
          bio,
          ...otherFields,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

const listUsers = async (req: Request, res: Response) => {
  try {
    const { sortBy } = req.query;

    let sortCriteria: { [key: string]: SortOrder | { $meta: any } } = {};

    if (typeof sortBy === "string") {
      // Example: sortBy=name or sortBy=followers
      sortCriteria[sortBy] = 1;
    } else {
      sortCriteria["username"] = 1; // Default sorting criteria if sortBy parameter is not provided
    }

    const users = await User.find({ isDeleted: false }).sort(sortCriteria);

    res.json(users);
  } catch (error) {
    console.error("Error listing users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  saveUser,
  findMutualFollowers,
  searchUsers,
  deleteUser,
  updateUser,
  listUsers,
};
