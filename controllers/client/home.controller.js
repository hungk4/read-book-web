// const fs = require("fs");
// const books = JSON.parse(fs.readFileSync("public/book.json"));
const Book = require("../../models/book.model");
const Category = require("../../models/category.model");

// [GET] /
module.exports.index = async (req, res) => {
  const books = await Book.find();
  res.render("client/pages/homepage.pug", {
    pageTitle: "Trang chủ",
    newBooks: books.slice(0, 5),
    books: books.slice(0, 10),
  });
};

// [GET] /books/:id
module.exports.book = async (req, res) => {
  const { id } = req.params;
  const { page } = req.query;

  // Tìm sách theo ID
  // const book = books.find((b) => b.id === id);
  const book = await Book.findById(id);
  if (!book) return res.status(404).send("Không tìm thấy sách");

  // Cập nhật trạng thái sách đang đọc
  book.isReading = true;
  await book.save();
  // fs.writeFileSync("public/book.json", JSON.stringify(books));

  // Nếu không có số trang, mặc định là trang 1
  const pageNumber = page || 1;

  // Render trang book.pug
  res.render("client/pages/book", {
    book,
    pageNumber,
  });
};

// [GET] /detail/:id
module.exports.detail = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("category");

    if (!book) {
      return res.status(404).send("Không tìm thấy sách");
    }

    res.render("client/pages/detail", {
      book,
      pageTitle: "Chi tiết sách",
      pageCSS: "/css/detail.css",
    });
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết sách:", error);
    res.status(500).send("Đã xảy ra lỗi trong quá trình xử lý yêu cầu.");
  }
};

// [GET] /bookshelf
module.exports.bookshelf = async (req, res) => {
  const books = await Book.find();
  const bookshelf = books.filter((book) => book.isReading === true);

  res.render("client/pages/bookshelf", {
    pageTitle: "Tủ sách của bạn",
    books: bookshelf,
    bookshelf,
    pageCSS: "/css/bookshelf.css",
  });
};

// [GET] /books/load-more
module.exports.loadMoreBooks = async (req, res) => {
  const { offset, limit } = req.query;
  const offsetNumber = parseInt(offset) || 0;
  const limitNumber = parseInt(limit) || 5;

  const books = await Book.find();
  const moreBooks = books.slice(offsetNumber, offsetNumber + limitNumber);
  res.json({
    moreBooks,
    mes: "Đã tải thêm sách thành công",
  });
};

// [DELETE] /bookshelf/delete/:id
module.exports.deleteBookFromBookshelf = async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);
  if (!book) {
    return res.status(404).send("Không tìm thấy sách để xóa");
  }

  book.isReading = false;
  await book.save();

  res.status(200).json({
    message: "Đã xóa sách khỏi tủ sách thành công",
  });
};
