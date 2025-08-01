import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Common middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);
app.use(express.static("public"));
app.use(cookieParser());

// import routers

import { healthcheckRouter } from "./routes/healthcheck.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/error.middlewares.js";
// routers

app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users", userRouter);

// error handler

app.use(errorHandler);

export { app };
