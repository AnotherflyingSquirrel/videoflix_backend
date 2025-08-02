import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  updateCurrentPassword,
  getCurrentUserProfile,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getChannel,
  getCurrentWatchHistory,
} from "../controllers/user.controllers.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { addValidUserToReq } from "../middlewares/auth.middlewares.js";

const userRouter = Router();

userRouter.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

userRouter.route("/login").post(loginUser);

// secure routes
userRouter.route("/refreshToken").post(addValidUserToReq, refreshAccessToken);
userRouter.route("/logout").post(addValidUserToReq, logoutUser);
userRouter
  .route("/change-password")
  .post(addValidUserToReq, updateCurrentPassword);
userRouter.route("/current-user").get(addValidUserToReq, getCurrentUserProfile);
userRouter.route("/channel/:username").get(addValidUserToReq, getChannel);
userRouter
  .route("/update-profile")
  .patch(addValidUserToReq, updateAccountDetails);
userRouter
  .route("/update-avatar")
  .patch(
    upload.fields([{ name: "avatar", maxCount: 1 }]),
    addValidUserToReq,
    updateUserAvatar
  );
userRouter
  .route("/update-cover-image")
  .patch(
    upload.fields([{ name: "coverImage", maxCount: 1 }]),
    addValidUserToReq,
    updateUserCoverImage
  );

userRouter
  .route("/watch-history")
  .get(addValidUserToReq, getCurrentWatchHistory);

export { userRouter };
