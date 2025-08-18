const express = require("express");
const  router = express.Router();
// const {booksController} = require("../controller/books")
const {homeController} = require("../controller/home");


router.get("/",homeController.getHomeData);



module.exports = router 