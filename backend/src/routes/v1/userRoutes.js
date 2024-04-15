const express = require("express");
const router = express.Router();
const {userController} = require('../../controllers/index')

router.post("/signup", userController.signup)
// router.get("/signin", userController.signin)

module.exports = router;