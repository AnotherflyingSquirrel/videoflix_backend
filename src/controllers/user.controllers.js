import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(500, [], "A user with provided id does not exist");
    }
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({
      validateBeforeSave: false,
    });
    return { accessToken, refreshToken };
  } catch (err) {
    throw new ApiError(err.status, err, err.message, err.stack);
  }
};

const loginUser = asyncHandler(async (req, res) => {
  try {
    if (!req.body) {
      throw new ApiError(405, [], "form data sent to server cannot be empty!");
    }

    const username = req.body.username?.trim();
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();

    // checking if not empty

    if (email === "" && username === "") {
      throw new ApiError(
        407,
        [],
        "email and username sent to server cannot be both empty"
      );
    }
    if (password === "") {
      throw new ApiError(408, [], "password sent to server cannot be empty");
    }
    const existingUser = User.findOne({
      $or: [{ username }, { email }],
    });
    if (!existingUser) {
      throw new ApiError(
        500,
        [],
        "A user with provided credentials does not exist"
      );
    }

    const isPasswordValid = await existingUser.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(500, [], "Incorrect credentials provided not exist");
    }
    const user = existingUser.select("-refreshToken -password");

    // refreshtoken is updated to database during execution of method generateAccessAndRefreshToken
    const { accessToken, refreshToken } = generateAccessAndRefreshToken(
      existingUser._id
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(200, "User Logged in successfully", {
          user: user,
          accessToken: accessToken,
          refreshToken: refreshToken,
        })
      );
  } catch (err) {
    console.log("something went wrong while logging in the user.");
    throw new ApiError(err.status, err, err.message, err.stack);
  }
});

const registerUser = asyncHandler(async (req, res) => {
  let avatarUploadCloudinaryRes = "";
  let coverImageUploadtoCloudinaryRes = "";

  try {
    if (!req.body) {
      throw new ApiError(405, [], "form data sent to server cannot be empty!");
    }
    let fullname = req.body.fullname;
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    //   validation
    if (fullname?.trim() === "") {
      throw new ApiError(406, [], "full name sent to server cannot be empty");
    }
    if (email?.trim() === "") {
      throw new ApiError(407, [], "email sent to server cannot be empty");
    }
    if (username?.trim() === "") {
      throw new ApiError(408, [], "username sent to server cannot be empty");
    }
    if (password?.trim() === "") {
      throw new ApiError(408, [], "password sent to server cannot be empty");
    }
    let avatarLocalPath;
    try {
      // console.log(`${req.files.avatar[0].path.toString()}`);
      avatarLocalPath = req.files?.avatar[0]?.path;
    } catch (e) {
      throw new ApiError(
        409,
        e,
        "avatar image sent to server cannot be read",
        e.stack
      );
    }
    let coverImageLocalPath;
    try {
      coverImageLocalPath = req.files?.coverImage[0]?.path;
    } catch (e) {
      throw new ApiError(
        409,
        e,
        "cover image sent to server cannot be read",
        e.stack
      );
    }
    if (!avatarLocalPath) {
      throw new ApiError(
        409,
        e,
        "avatar image sent to server cannot be empty",
        e.stack
      );
    }

    // convert email to lowercase so db query does not return a false positive in case
    // the emails match but only have case mismatch
    email = email.toLowerCase();
    const doesUserExist = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (doesUserExist) {
      throw new ApiError(410, [], "User with same credentials already exists");
    }
    if (coverImageLocalPath) {
      coverImageUploadtoCloudinaryRes =
        await uploadToCloudinary(coverImageLocalPath);
    }
    avatarUploadCloudinaryRes = await uploadToCloudinary(avatarLocalPath);
    if (avatarUploadCloudinaryRes === null) {
      throw new ApiError(520, [], "avatar image upload to cloudinary failed");
    }
    if (coverImageUploadtoCloudinaryRes === null) {
      throw new ApiError(520, [], "cover image upload to cloudinary failed");
    }
    const newUser = await User.create({
      fullname: fullname,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: password,
      avatar: avatarUploadCloudinaryRes.url,
      coverImage: coverImageUploadtoCloudinaryRes?.url || "",
    });

    const createdUser = await User.findById(newUser._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) {
      throw new ApiError(
        500,
        [],
        "something went wrong and User was not created on db"
      );
    }
    return res
      .status(202)
      .json(
        new ApiResponse(202, "New User registered succesfully", createdUser)
      );
  } catch (err) {
    if (avatarUploadCloudinaryRes) {
      deleteFromCloudinary(avatarUploadCloudinaryRes.publicID);
    }
    if (coverImageUploadtoCloudinaryRes) {
      deleteFromCloudinary(coverImageUploadtoCloudinaryRes.publicID);
    }
    console.log(
      "something went wrong while creating user and images were deleted"
    );
    throw new ApiError(err.status, err, err.message, err.stack);
  }
});

export { registerUser, loginUser };
