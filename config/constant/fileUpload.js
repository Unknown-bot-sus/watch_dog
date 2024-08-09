const MIME_TYPES = ["image/jpg", "image/png", "image/jpeg"];
// default 5mb
const IMAGE_SIZE_LIMIT =
  parseInt(process.env.IMAGE_SIZE_LIMIT || "0") || 5 * 1024 * 1024;