const express = require("express");
const  router = express.Router();
const {adminController} = require("../controller/admin")
const {userAuth} = require("../middlewares/userAuth");
const {checkRole} = require("../middlewares/checkRole");


router.post("/login",adminController.login)
router.post("/addlibrarian",userAuth,checkRole("admin"),adminController.addLibrarian)



module.exports = router