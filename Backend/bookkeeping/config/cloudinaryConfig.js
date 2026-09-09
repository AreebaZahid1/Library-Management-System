require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config
({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary =  (fileBuffer) => 
{
  return new Promise((resolve, reject) => 
    {
    const stream = cloudinary.uploader.upload_stream
    (
      { folder: "profile_pictures" },
      (error, result) => 
        {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};


module.exports = { cloudinary, uploadToCloudinary };