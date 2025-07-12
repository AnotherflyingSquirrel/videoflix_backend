import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import { error } from "node:console";
import fs from "node:fs";
import { ApiError } from "./apiError.js";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log(
      `file at ${localFilePath} uploaded to cloudinary. File src: ${uploadResult.url}`
    );
    // delete file from local storage once the file gets uploaded or the process fails
    fs.unlink(localFilePath, (error) => {
      if (error) {
        throw new ApiError(435, [...error], `${localFilePath} was deleted`);
      }
    });
    return uploadResult;
  } catch (error) {
    console.log(error);

    // delete file from local storage once the file gets uploaded or the process fails
    fs.unlink(localFilePath, (error) => {
      console.error(error);
    });
    return null;
  }
};

const deleteFromCloudinary = async (publicID) => {
  try {
    const deleteResult = await cloudinary.uploader.destroy(publicID);
    console.log(`deleted image from cloudinary. PublicID: ${publicID}`);
  } catch (err) {
    throw new ApiError(
      505,
      err,
      `Error while delting image from cloudinary with publicID: ${publicID}`
    );
  }
};

export { uploadToCloudinary, deleteFromCloudinary };
