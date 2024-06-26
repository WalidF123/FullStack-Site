const express = require('express');
const ReviewController = require('../controllers/review.controller.js');
const router = express.Router();

router.get('/', ReviewController.all); //select all review
router.get('/:id', ReviewController.one); //search review
router.post("/", ReviewController.create);//add review
router.put('/:id',ReviewController.edit);//edit review
router.delete("/:id", ReviewController.remove);//delete review
router.get('/products/:productId/reviews', ReviewController.getReviewsByProductId);
//router.get('/products/:productId/reviews', ReviewController.getReviewsByProductId);

module.exports = router;