const db = require('../database');

// Select all reviews from the database.
exports.all = async (req, res) => {
  const reviews = await db.review.findAll();

  res.json(reviews);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const review = await db.review.findByPk(req.params.id);

  res.json(review);
};

exports.edit = async (req, res) => {
  try {
    const review = await db.review.findByPk(req.body.review_id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    review.review_text = req.body.review_text;
    await review.save();

    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const review = await db.review.findByPk(req.body.review_id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    await review.destroy();
    res.json({ message: 'Review removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.create = async (req, res) => {
//   try {
//     const { productID, rating, reviewText, isDeleted} = req.body;
//     const review = await db.review.create({ product_id: productID, user_id: userID,rating, review_text: reviewText, isDeleted: isDeleted });
//     res.status(201).json(review);
// } catch (error) {
//     res.status(500).json({ error: 'Failed to create review' });
// }
// };
exports.create = async (req, res) => {
  try {
    const { productID, userID, rating, reviewText, isDeleted } = req.body;

    console.log('Creating review with the following data:');
    console.log({ productID, userID, rating, reviewText, isDeleted });

    // Validate if the user and product exist
    const user = await db.user.findByPk(userID);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const product = await db.product.findByPk(productID);
    if (!product) {
      return res.status(400).json({ error: 'Product not found' });
    }

    // Attempt to create the review
    const review = await db.review.create({
      product_id: productID,
      user_id: userID,
      rating,
      review_text: reviewText,
      isDeleted
    });

    console.log('Review created successfully:', review);

    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review', details: error.message });
  }
};
// exports.getReviewsByProductId = async (req, res) => {
//   const { productId } = req.params;
  
//   try {
//     const reviews = await db.review.findAll({
//       where: { productId },
//     });

//     if (reviews.length > 0) {
//       res.status(200).json({ reviews });
//     } else {
//       res.status(404).json({ message: 'No reviews found for this product.' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while fetching reviews.' });
//   }
// };

exports.getReviewsByProductId = async (req, res) => {
  const { productId } = req.params;
  
  try {
    const reviews = await db.review.findAll({
      where: { product_id: productId }, // Ensure the column name matches your database schema
    });

    if (reviews.length > 0) {
      res.status(200).json({ reviews });
    } else {
      res.status(404).json({ message: 'No reviews found for this product.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching reviews.' });
  }
};