const express = require("express");
const  router = express.Router();
const {booksController} = require("../controller/books")
const {userAuth} = require("../middlewares/userAuth");
const {checkRole} = require("../middlewares/checkRole");
const {upload} = require("../utils/cloudConfig");

router.post("/add",userAuth,checkRole(["admin", "librarian"]),upload.single("coverImage"),booksController.addNewBook)
router.get("/issued",userAuth,checkRole("user"),booksController.getIssuedBooks)

router.get("/",booksController.getAllBooks)
router.get("/issuedrequest",booksController.getIssuedRequest)
router.get("/new",booksController.getLatestBooks)
router.get("/:id",booksController.getParticularBook)
router.delete("/delete/:id",userAuth,checkRole(["admin", "librarian"]),booksController.deleteBook)
router.put("/update/:id",userAuth,checkRole(["admin", "librarian"]),booksController.updateBook)
router.post("/borrow/request-issue/:bookid",userAuth,checkRole("user"),booksController.reqIssueBook)
router.put("/return/:id",userAuth,checkRole("user"),booksController.returnBook)
router.put("/returnrequest/:id",userAuth,checkRole("user"),booksController.requestReturnBook)




module.exports = router 