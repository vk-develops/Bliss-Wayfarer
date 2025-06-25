import cloudinary from "cloudinary";
import { v2 as cloudinaryV2 } from "cloudinary";

const uploadMediaFiles = async (mediaFiles) => {
    try {
        // An array to hold all the upload promises
        const uploadPromises = mediaFiles.map((file) => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinaryV2.uploader.upload_stream(
                    {
                        resource_type: file.mimetype.startsWith("image")
                            ? "image"
                            : "video",
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result.secure_url);
                        }
                    }
                );

                // Write the file buffer to the upload stream
                uploadStream.end(file.buffer);
            });
        });

        // Wait for all the uploads to complete
        const mediaUrls = await Promise.all(uploadPromises);

        return mediaUrls;
    } catch (error) {
        console.error("Error uploading media files:", error);
    }
};

export { uploadMediaFiles };
