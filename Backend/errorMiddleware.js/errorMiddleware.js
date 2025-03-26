export const errorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: "File upload error", error: err.message });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  };