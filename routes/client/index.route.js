const express = require("express");
const router = express.Router();

const homeController = require("../../controllers/client/home.controller");

router.get("/", homeController.index);
router.get("/detail/:id", homeController.detail);
router.get("/books/load-more", homeController.loadMoreBooks);
router.get("/books/:id", homeController.book);
router.get("/bookshelf", homeController.bookshelf);
router.delete("/bookshelf/delete/:id", homeController.deleteBookFromBookshelf);
router.get("/categories/:id", homeController.categories);
router.get("/search", homeController.search);


module.exports = router;