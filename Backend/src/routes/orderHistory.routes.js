const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderHistory.controller.js');

// Select all cart items.
router.get("/", controller.all);

// Select all cart items by cartID.
router.get("/user/:userID", controller.byUser);



module.exports = router;
