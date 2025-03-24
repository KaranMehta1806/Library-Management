const express = require("express");
const  router = express.Router();
const {booksController} = require("../controller/books")

router.post("/add",booksController.addNewBook)
router.get("/",booksController.getAllBooks)
router.get("/:id",booksController.getParticularBook)
router.delete("/delete/:id",booksController.deleteBook)
router.put("/update/:id",booksController.updateBook)


module.exports = router