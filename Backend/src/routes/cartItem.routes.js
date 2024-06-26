const express = require('express');
const router = express.Router();
const controller = require('../controllers/cartItem.controller.js');

// Select all cart items.
router.get("/", controller.all);

// Select all cart items by cartID.
router.get("/user/:userID", controller.byUser);

// Add a new item to the cart.
router.post("/", controller.add);

// Update the quantity of a cart item.
router.put("/:id", controller.updateQuantity);

// Delete a cart item by its ID.
router.delete("/:id", controller.remove);

router.post('/transfer', controller.transferToOrderHistory);

module.exports = router;

