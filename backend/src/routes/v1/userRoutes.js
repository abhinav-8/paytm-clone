const express = require("express");
const router = express.Router();
const {userController} = require('../../controllers/index')
const { userAuth } = require("../../middlewares/index")

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.patch("/", userAuth.isAuthenticated, userController.update);
router.get("/bulk", userController.search);
module.exports = router;