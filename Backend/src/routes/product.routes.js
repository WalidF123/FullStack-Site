const express = require('express');
const ProductController = require('../controllers/product.controller.js');
const router = express.Router();

router.get('/', ProductController.all); //select all product
router.get('/:id', ProductController.one); //search product
router.post("/", ProductController.create);
module.exports = router;
// module.exports = (express, app) => {
//     const controller = require("../controllers/product.controller.js");
//     const router = express.Router();
  
//     // Seslect all users.
//     router.get('/', controller.all); 
//     // Select a single user with id.
//     router.get('/:id', controller.one); //search product
//     router.post("/", controller.create);
  
//     // Add routes to server.
//     app.use("/api/products", router);
//   };
  