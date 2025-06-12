const multer = require("multer");
const path = require("path");

// Cấu hình lưu trữ file trong public/images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images")); // lưu vào public/images
  },

  filename: function (req, file, cb) {
    // req.body.title chưa tồn tại ở đây nếu không có middleware parse body trước đó
    const originalTitle = req.body?.title || "unknown";
    const slug = originalTitle
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-") // loại bỏ ký tự đặc biệt
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const ext = path.extname(file.originalname);
    cb(null, slug + "-" + Date.now() + ext); // Ví dụ: giai-tich-1720182881.jpg
  }
});

// Export middleware upload
const upload = multer({ storage: storage });
module.exports = upload;
