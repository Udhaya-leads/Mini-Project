const express =require('express');
const { creatOrder } = require('../controllers/orderControllers');
const router =express.Router();

router.route('/orders').post(creatOrder);

module.exports = router;