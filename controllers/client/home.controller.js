const fs = require("fs");
const books = JSON.parse(fs.readFileSync("public/book.json"));

// [GET] /
module.exports.index = (req, res) => {
  res.render("client/pages/homepage.pug", {
    pageTitle: "Trang chủ",
    books: books.slice(0, 5),
  });
};

// [GET] /books/:id
module.exports.book = (req, res) => {
  const { id } = req.params;
  const { page } = req.query;

  // Tìm sách theo ID
  const book = books.find((b) => b.id === id);
  if (!book) return res.status(404).send("Không tìm thấy sách");

  // Nếu không có số trang, mặc định là trang 1
  const pageNumber = page || 1;

  // Render trang book.pug
  res.render("client/pages/book", {
    book,
    pageNumber,
  });
};

// [GET] /detail/:id
module.exports.detail = (req, res) => {
  const book = books.find((b) => b.id === req.params.id);
  if (!book) return res.status(404).send("Không tìm thấy sách");
  res.render("client/pages/detail", {
    book,
    pageTitle: "Chi tiết sách",
    pageCSS: "/css/detail.css",
  });
};
