import { cloudinary } from "../config/cloudinaryConfig.js";

export const uploadFileToCloudinary = async (file, folder = "trees_images") => {
  try {
    const base64File = getBase64(file);
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(base64File, { folder }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });

    const formattedResult = {
      fieldname: file.fieldname,
      originalName: file.originalname,
      public_id: result.public_id,
      url: result.secure_url,
    };

    return formattedResult;
  } catch (error) {
    console.error(error);
    throw new Error("Error Uploading File to Cloudinary");
  }
};

export const getBase64 = (file) =>
  `data:${file?.mimetype};base64,${file?.buffer.toString("base64")}`;
