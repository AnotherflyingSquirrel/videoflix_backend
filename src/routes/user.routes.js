import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controllers.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const userRouter = Router();

userRouter.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

// secure routes
userRouter.route("/login").post(verifyJWT, loginUser);
userRouter.route("/logout").post(verifyJWT, logoutUser);

export { userRouter };
