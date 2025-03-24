const express = require("express");
const  router = express.Router();

const {userController} = require("../controller/user")
router.get("/",userController.getUsers)

router.post("/register",userController.userRegistration);

router.post("/login",userController.login)



module.exports = router;