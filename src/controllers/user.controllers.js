import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import fs from "node:fs";
import jwt from "jsonwebtoken";

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
      console.log(req.body);
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

    const existingUser = await User.findOne({
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
      throw new ApiError(500, [], "Incorrect credentials provided");
    }
    delete existingUser.password;
    delete existingUser.refreshToken;

    // refreshtoken is updated to database during execution of method generateAccessAndRefreshToken
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      existingUser._id
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    console.log(`user:${existingUser.username} logged in successfully`);
    console.log(`${refreshToken} logged in successfully`);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(200, "User Logged in successfully", {
          user: existingUser,
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
  let avatarLocalPath = "";
  let coverImageLocalPath = "";

  try {
    if (!req.body) {
      throw new ApiError(405, [], "form data sent to server cannot be empty!");
    }
    let fullname = req.body?.fullname;
    let username = req.body?.username;
    let password = req.body?.password;
    let email = req.body?.email;

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
    if (avatarLocalPath) {
      fs.unlink(avatarLocalPath, (error) => {
        if (error)
          throw new ApiError(
            err.status,
            err,
            "couldnt delete avatarImage from localPath",
            error.stack
          );
        console.log("avatarImage was deleted");
      });
    }
    if (coverImageLocalPath) {
      fs.unlink(coverImageLocalPath, (error) => {
        if (error)
          throw new ApiError(
            err.status,
            err,
            "couldnt delete coverImage from localPath",
            error.stack
          );
        console.log("coverImage was deleted");
      });
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
    if (avatarLocalPath) {
      fs.unlink(avatarLocalPath, (error) => {
        if (error)
          throw new ApiError(
            err.status,
            err,
            "couldnt delete avatarImage from localPath",
            error.stack
          );
        console.log("avatarImage was deleted");
      });
    }
    if (coverImageLocalPath) {
      fs.unlink(coverImageLocalPath, (error) => {
        if (error)
          throw new ApiError(
            err.status,
            err,
            "couldnt delete coverImage from localPath",
            error.stack
          );
        console.log("coverImage was deleted");
      });
    }
    console.log(
      "something went wrong while creating user and images were deleted"
    );
    throw new ApiError(err.status, err, err.message, err.stack);
  }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    // const { incomingRefreshToken } =
    //   req.cookies?.refreshToken || req.body.refreshToken;
    // if (!incomingRefreshToken) {
    //   throw new ApiError(451, [], "Invalid refresh token");
    // }
    // const userId = jwt.verify(
    //   incomingRefreshToken,
    //   process.env.REFRESH_TOKEN_SECRET_KEY
    // )?._id;
    // if (!userId) {
    //   throw new ApiError(451, [], "Invalid refresh token");
    // }
    const user = req.user ? req.user : null;
    if (!user) {
      throw new ApiError(451, [], "Invalid refresh token");
    }
    // if (user.refreshToken !== incomingRefreshToken) {
    //   throw new ApiError(451, [], "Invalid refresh token");
    // }
    delete user.password;
    delete user.refreshToken;
    const outgoingUser = user;

    // refreshtoken is updated to database during execution of method generateAccessAndRefreshToken
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
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
        new ApiResponse(210, "Access token refreshedsuccessfully", {
          user: outgoingUser,
          accessToken: accessToken,
          refreshToken: refreshToken,
        })
      );
  } catch (err) {
    console.error("error while refreshing refresh token");
    throw new ApiError(
      err.statusCode,
      err,
      "couldn't refresh the refresh and access token",
      err.stack
    );
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };
  console.log(`user:${user} logged out successfully`);
  return res
    .status(212)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(212, "User successfully logged out", {}));
});

const updateCurrentPassword = asyncHandler(async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);
    const isPasswordValid = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordValid) {
      throw new ApiError(500, [], "Incorrect credentials passed");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
      .status(216)
      .json(new ApiResponse(216, "Password updated successfully", {}));
  } catch (e) {
    console.log(`Couldn't update user password\n`);
    throw new ApiError(
      e.statusCode,
      e,
      "Faield to update user password",
      e.stack
    );
  }
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  return res
    .status(214)
    .json(new ApiResponse(214, "User fetched successfully", req.user));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  try {
    let fullname = req.user?.fullname;
    let email = req.user?.email;

    //   validation
    if (fullname?.trim() === "") {
      throw new ApiError(406, [], "full name sent to server cannot be empty");
    }
    if (email?.trim() === "") {
      throw new ApiError(407, [], "email sent to server cannot be empty");
    }

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          fullname: fullname,
          email: email.toLowerCase(),
        },
      },
      { new: true }
    ).select("-password -refreshToken");

    return res
      .status(216)
      .json(new ApiResponse(216, user, "Account details updated successfully"));
  } catch (e) {
    console.log(`Couldn't update user details\n`);
    throw new ApiError(
      e.statusCode,
      e,
      "Failed to update user profile",
      e.stack
    );
  }
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  let avatarLocalPath;
  let avatarUploadCloudinaryRes;
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
  if (!avatarLocalPath) {
    throw new ApiError(
      409,
      e,
      "avatar image sent to server cannot be empty",
      e.stack
    );
  }
  try {
    avatarUploadCloudinaryRes = await uploadToCloudinary(avatarLocalPath);
    if (avatarUploadCloudinaryRes === null) {
      throw new ApiError(520, [], "avatar image upload to cloudinary failed");
    }

    if (!avatarUploadCloudinaryRes.url) {
      throw new ApiError(520, "Error while uploading on cloudinary");
    }
    if (avatarLocalPath) {
      fs.unlink(avatarLocalPath, (error) => {
        if (error) {
          throw new ApiError(
            err.status,
            err,
            "couldnt delete avatarImage from localPath",
            error.stack
          );
        }
        console.log("avatarImage was deleted");
      });
    }
    const oldAvatarImageURL = req.user?.avatar;
    if (oldAvatarImageURL) {
      deleteFromCloudinary(oldAvatarImageURL);
    }
    // if (avatarUploadCloudinaryRes) {
    //   await deleteFromCloudinary(avatarUploadCloudinaryRes.publicID);
    // }
    // const avatarUploadCloudinaryRes=  = user
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          avatar: avatarUploadCloudinaryRes.url,
        },
      },
      { new: true }
    ).select("-password -refreshToken");

    return res
      .status(216)
      .json(new ApiResponse(216, user, "Avatar image updated successfully"));
  } catch (e) {
    if (avatarLocalPath) {
      fs.unlink(avatarLocalPath, (error) => {
        if (error) {
          throw new ApiError(
            err.status,
            err,
            "couldnt delete avatarImage from localPath",
            error.stack
          );
        }
        console.log("avatarImage was deleted");
      });
    }
    if (avatarUploadCloudinaryRes) {
      deleteFromCloudinary(avatarUploadCloudinaryRes.publicID);
    }

    throw new ApiError(e.statusCode, e, "Failed to update avatar image",e.stack);
  }
});

const updateUserCoverImage = asyncHandler(async (req, res) => {
  let coverLocalPath;
  let coverUploadCloudinaryRes;
  try {
    // console.log(`${req.files.cover[0].path.toString()}`);
    coverLocalPath = req.files?.coverImage[0]?.path;
  } catch (e) {
    throw new ApiError(
      409,
      e,
      "cover image sent to server cannot be read",
      e.stack
    );
  }
  if (!coverLocalPath) {
    throw new ApiError(
      409,
      e,
      "cover image sent to server cannot be empty",
      e.stack
    );
  }
  try {
    coverUploadCloudinaryRes = await uploadToCloudinary(coverLocalPath);
    if (coverUploadCloudinaryRes === null) {
      throw new ApiError(520, [], "cover image upload to cloudinary failed");
    }

    if (!coverUploadCloudinaryRes.url) {
      throw new ApiError(520, "Error while uploading on cloudinary");
    }
    if (coverLocalPath) {
      fs.unlink(coverLocalPath, (error) => {
        if (error) {
          throw new ApiError(
            err.status,
            err,
            "couldnt delete coverImage from localPath",
            error.stack
          );
        }
        console.log("coverImage was deleted");
      });
    }
    const oldcoverImageURL = req.user?.coverImage;
    if (oldcoverImageURL) {
      deleteFromCloudinary(oldcoverImageURL);
    }
    // if (coverUploadCloudinaryRes) {
    //   await deleteFromCloudinary(coverUploadCloudinaryRes.publicID);
    // }
    // const coverUploadCloudinaryRes=  = user
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          cover: coverUploadCloudinaryRes.url,
        },
      },
      { new: true }
    ).select("-password -refreshToken");

    return res
      .status(216)
      .json(new ApiResponse(216, user, "cover image updated successfully"));
  } catch (e) {
    if (coverLocalPath) {
      fs.unlink(coverLocalPath, (error) => {
        if (error) {
          throw new ApiError(
            err.status,
            err,
            "couldnt delete coverImage from localPath",
            error.stack
          );
        }
        console.log("coverImage was deleted");
      });
    }
    if (coverUploadCloudinaryRes) {
      deleteFromCloudinary(coverUploadCloudinaryRes.publicID);
    }
    throw new ApiError(e.statusCode, e, "Failed to update cover image",e.stack);
  }
});

export {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  updateCurrentPassword,
  updateUserCoverImage,
  updateUserAvatar,
  updateAccountDetails,
  getCurrentUserProfile,
};
