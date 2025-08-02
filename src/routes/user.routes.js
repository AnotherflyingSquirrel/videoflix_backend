import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
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

userRouter.route("/login").post(upload.fields([]), loginUser);

// secure routes
userRouter.route("/refreshToken").post(addValidUserToReq, refreshAccessToken);
userRouter.route("/logout").post(addValidUserToReq, logoutUser);
userRouter.route("/").post(addValidUserToReq, logoutUser);
userRouter.route("/logout").post(addValidUserToReq, logoutUser);
userRouter.route("/logout").post(addValidUserToReq, logoutUser);
userRouter.route("/logout").post(addValidUserToReq, logoutUser);

export { userRouter };
