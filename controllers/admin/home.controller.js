const Book = require("../../models/book.model");
const Category = require("../../models/category.model");
const { generatePageNumber } = require("../../helper/generatePageNumber");

// [GET] /admin
module.exports.index = async (req, res) => {
  res.render("admin/pages/homepage", {
    pageTitle: "Admin Home",
  });
};

// [GET] /admin/books
module.exports.books = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 2;
  const totalBooks = await Book.countDocuments();
  const totalPages = Math.ceil(totalBooks / limit);

  const books = await Book.find()
    .populate("category")
    .skip((page - 1) * limit)
    .limit(limit);
  res.render("admin/pages/books", {
    pageTitle: "Books",
    books,
    pageNumbers: generatePageNumber(page, totalPages),
    totalPages,
  });
};

// [GET] /admin/categories
module.exports.categories = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 2;
  const totalCategories = await Category.countDocuments();
  const totalPages = Math.ceil(totalCategories / limit);
  const categories = await Category.find().skip((page - 1) * limit).limit(limit);
  res.render("admin/pages/categories", {
    pageTitle: "Categories",
    categories,
    pageNumbers: generatePageNumber(page, totalPages),
    totalPages,
  });
};
