const express = require("express");
const router = express.Router();

const homeController = require("../../controllers/client/home.controller");

router.get("/", homeController.index);
router.get("/detail/:id", homeController.detail);
router.get("/books/:id", homeController.book);


module.exports = router;