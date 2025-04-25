import cloudinary from 'cloudinary';

// Function to upload profile picture
export const uploadProfilePicture = async (req, res) => {
    try {
      // Check if the file exists in the request
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      // Upload image to Cloudinary
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'profile_pictures', // Optional: Specify a folder in Cloudinary
        transformation: [
          { width: 150, height: 150, crop: 'thumb', gravity: 'face' }, // Optional: Resize or crop image
        ]
      });
  
      // Respond with the URL of the uploaded image
      return res.status(200).json({ url: result.secure_url });
    } catch (err) {
      console.error('Image upload failed:', err);
      return res.status(500).json({ message: 'Image upload failed', error: err.message });
    }
  };
