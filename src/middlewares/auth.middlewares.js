import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.models";

const verifyJWT = asyncHandler(async (req, _, next) => {
  const accessTokenJWT =
    req.cookies.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!accessTokenJWT) {
    throw new ApiError(456, [], "Invalid JWT verification candidate");
  }

  try {
    const idField = jwt.verify(
      accessTokenJWT,
      process.env.ACCESS_TOKEN_SECRET_KEY
    )?._id;
    if (!idField) {
      throw new ApiError(456, [], "Invalid JWT verification candidate");
    }
    const user = User.findById(idField).select("-password -refreshToken");
    if (!user) {
      throw new ApiError(456, [], "Invalid accessToken provided");
    }
    req.user = user;
    next();
  } catch (e) {
    throw new ApiError(456, e, "Invalid accessToken provided", e.stack);
  }
});

export { verifyJWT };
