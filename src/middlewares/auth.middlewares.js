import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";

const addValidUserToReq = asyncHandler(async (req, _, next) => {
  // console.log(`hello! ${req.cookies.refreshToken}`);
  let refreshTokenJWT =
    req.cookies.refreshToken ||
    req.signedCookies.refreshToken ||
    req.body.refreshToken;
  if (!refreshTokenJWT) {
    refreshTokenJWT = req.header("Authorization")?.toString();
    refreshTokenJWT = refreshTokenJWT.slice(7);
  }
  if (!refreshTokenJWT) {
    throw new ApiError(456, [], "Invalid JWT verification candidate");
  }

  try {
    // console.log(refreshTokenJWT);
    const incomingRefreshToken = jwt.verify(
      refreshTokenJWT,
      process.env.REFRESH_TOKEN_SECRET_KEY
    );
    if (!incomingRefreshToken) {
      throw new ApiError(456, [], "Invalid refresh Token");
    }

    const idField = incomingRefreshToken?._id;
    if (!idField) {
      throw new ApiError(456, [], "Invalid JWT verification candidate");
    }
    const user = await User.findById(idField).select("-password");
    if (!user) {
      throw new ApiError(456, [], "Invalid accessToken provided");
    }
    // console.log(user._id);
    // console.log(`${(user.refreshToken)}\n${refreshTokenJWT}`);
    if (user.refreshToken !== refreshTokenJWT) {
      throw new ApiError(456, [], "Invalid refresh Token");
    }
    req.user = user;

    next();
  } catch (e) {
    throw new ApiError(456, e, "Invalid accessToken provided", e.stack);
  }
});

export { addValidUserToReq };
