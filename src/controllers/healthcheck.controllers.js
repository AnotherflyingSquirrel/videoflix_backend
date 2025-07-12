import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const healthcheck = asyncHandler((req, res) => {
  try {
    return res
      .status(200)
      .json(new ApiResponse(200, "OK", "Health Check Passed"));
  } catch (e) {
    return res.status(400).json(new Error(e));
  }
});

export { healthcheck };
