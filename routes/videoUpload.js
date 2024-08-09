const { upload } = require("../middleware/videoUpload");
const { videoUpload } = require("../controllers/videoUpload");
const { Router } = require("express")
const router = Router();

router.route('/').post(upload.single("video"), videoUpload);

module.exports = router;