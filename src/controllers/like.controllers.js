import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user?._id;
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }

  const existingLike = await Like.findOne({ video: videoId, likedBy: userId });

  if (existingLike) {
    await Like.findOneAndRemove({ video: videoId, likedBy: userId });
    return res.status(200).json(new ApiResponse(200, {}, "Video unliked"));
  }

  const newLike = await Like.create({
    video: videoId,
    likedBy: userId,
  });
  return res.status(200).json(new ApiResponse(200, newLike, "Video liked"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user?._id;
  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment ID");
  }

  const existingLike = await Like.findOne({
    comment: commentId,
    likedBy: userId,
  });

  if (existingLike) {
    await Like.findOneAndRemove({ comment: commentId, likedBy: userId });
    return res.status(200).json(new ApiResponse(200, {}, "Comment unliked"));
  }

  const newLike = await Like.create({
    comment: commentId,
    likedBy: userId,
  });
  return res.status(200).json(new ApiResponse(200, newLike, "Comment liked"));
});

const getLikedVideos = asyncHandler(async (req, res) => {

})

export {
    toggleCommentLike,
    toggleVideoLike,
    getLikedVideos
}