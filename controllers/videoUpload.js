const videoUpload = (req, res) => {
    if (req.file) {
        res.json({
          message: 'Video uploaded successfully!',
        });
      } else {
        res.status(400).json({
          message: 'Failed to upload video'
        });
      }
}

exports.videoUpload = videoUpload