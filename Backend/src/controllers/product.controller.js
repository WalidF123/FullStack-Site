const db = require('../database');

// Select all products from the database.
exports.all = async (req, res) => {
  const products = await db.product.findAll();

  res.json(products);
};

// Select one product from the database.
exports.one = async (req, res) => {
  const product = await db.product.findByPk(req.params.id);

  res.json(product);
};

exports.create = async (req, res) => {

  const products = await db.product.create({
    id: req.body.id,
    name: req.body.name,
    image: req.body.image,
    type: req.body.type,
    discountedprice: req.body.discountedprice,
    actualprice :req.body.actualprice
  });

  res.json(products);
};
