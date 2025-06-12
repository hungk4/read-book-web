const express = require("express");
const router = express.Router();

const homeController = require("../../controllers/admin/home.controller");

router.get("/", homeController.index);
router.get("/books", homeController.books);
router.get("/categories", homeController.categories);


module.exports = router;