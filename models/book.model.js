const mongoose = require("mongoose");

// Định nghĩa Schema cho Book
const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: { type: String, required: true }, // Đường dẫn hình ảnh
    file: { type: String, required: true }, // Đường dẫn file PDF
    description: { type: String },
    isReading: { type: Boolean, default: false }, // Trạng thái đang đọc
    chapters: [
      {
        id: { type: String, required: true }, // ID chương
        title: { type: String, required: true }, // Tên chương
        page: { type: Number, required: true }, // Trang bắt đầu của chương
      },
    ],
  },
  {
    timestamps: true, // Tự động thêm trường createdAt và updatedAt
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
