
const db = require("../database");
//const OrderHistory = require('../database/models/orderHistory');
const OrderHistory = db.orderHistory; // Correctly import the OrderHistory model

// Select all cart items from the database.
exports.all = async (req, res) => {
  try {
    const cartItems = await db.cartItem.findAll();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Select all cart items by userID.
exports.byUser = async (req, res) => {
  try {
    const cartItems = await db.cartItem.findAll({ where: { userID: req.params.userID } });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.add = async (req, res) => {
  try {
    const { userID, productID, quantity } = req.body;

    if (!userID || !productID || !quantity) {
      return res.status(400).json({ error: 'Missing required parameters.' });
    }

    // Find the product to get the product details (e.g., name and price)
    const product = await db.product.findByPk(productID);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    // Check if the product already exists in the user's cart
    const existingCartItem = await db.cartItem.findOne({
      where: {
        userID,
        productID: product.id
      }
    });

    if (existingCartItem) {
      // If the product is already in the cart, update the quantity
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      res.status(200).json(existingCartItem);
    } else {
      // If the product is not in the cart, add it
      const cartItem = await db.cartItem.create({
        userID,
        productID: product.id,
        productName: product.name,     
        quantity,
        price: product.discountedprice, // Include the price here

      });
      res.status(201).json(cartItem);
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart.' });
  }
};

// Update the quantity of a cart item.
exports.updateQuantity = async (req, res) => {
  try {
    const cartItem = await db.cartItem.findByPk(req.body.cartItemID);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    cartItem.quantity = req.body.quantity;
    await cartItem.save();

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove an item from the cart.
exports.remove = async (req, res) => {
  try {
    const cartItem = await db.cartItem.findByPk(req.body.cartItemID);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    await cartItem.destroy();
    res.json({ message: 'Cart item removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.transferToOrderHistory = async (req, res) => {
//   try {
//     const { userID } = req.body;  // Get userID from request body

//     // Retrieve all cart items for the user from the database
//     const cartItems = await db.cartItem.findAll({ where: { userID } });

//     if (!cartItems.length) {
//       return res.status(404).json({ message: 'No items in cart' });
//     }

//     // Iterate over each cart item and save it to the order history
//     for (const item of cartItems) {
//       await OrderHistory.create({
//         cartItemID: item.cartItemID,
//         userID: item.userID,
//         productID: item.productID,
//         productName: item.productName,
//         quantity: item.quantity,
//         price: item.price,
       
//       });

//       // Delete each cart item after transferring
//       await item.destroy();
//     }

//     res.status(200).json({ message: 'Cart items transferred to order history successfully.' });
//   } catch (error) {
//     console.error('Error transferring cart items:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

exports.transferToOrderHistory = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const { userID } = req.body;  // Get userID from request body

    // Retrieve all cart items for the user from the database
    const cartItems = await db.cartItem.findAll({ where: { userID }, transaction });

    if (!cartItems.length) {
      await transaction.rollback();
      return res.status(404).json({ message: 'No items in cart' });
    }

    // Iterate over each cart item and save it to the order history
    for (const item of cartItems) {
      await OrderHistory.create({
        cartItemID: item.cartItemID, // Comment this out if it's causing issues
        userID: item.userID,
        productID: item.productID,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
      }, { transaction });

      // Delete each cart item after transferring
      //await item.destroy({ transaction });
    }

    await transaction.commit();
    
    res.status(200).json({ message: 'Cart items transferred to order history successfully.' });
  } catch (error) {
    await transaction.rollback();
    console.error('Error transferring cart items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};