const express = require("express") ;
const router = express.Router();
const {accountController} = require('../../controllers/index')
const { userAuth } = require("../../middlewares/index")

router.get('/balance', userAuth.isAuthenticated , accountController.getBalance);
router.post('/transfer',userAuth.isAuthenticated, accountController.transferMoney);
module.exports = router;
