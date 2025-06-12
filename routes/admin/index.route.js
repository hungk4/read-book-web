const express = require("express");
const router = express.Router();

const homeController = require("../../controllers/admin/home.controller");
const upload = require("../../helper/storage");

router.get("/", homeController.index);
router.get("/books", homeController.books);
router.get("/categories", homeController.categories);
router.get("/books/add", homeController.addBook);
router.post("/books/add", upload.single('image'), homeController.postAddBook);

module.exports = router;
