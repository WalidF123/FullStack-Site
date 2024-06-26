const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.product = require("./models/product.js")(db.sequelize, DataTypes);
// db.cart = require("./models/cart.js")(db.sequelize, DataTypes);
db.cartItem = require("./models/cartItem.js")(db.sequelize,DataTypes);
db.review = require("./models/review.js")(db.sequelize,DataTypes);
db.orderHistory = require("./models/orderHistory.js")(db.sequelize,DataTypes);

// Relate post and user.
// Define associations
// db.cart.hasMany(db.cartItem, { foreignKey: 'cartItemID' });
// db.cartItem.belongsTo(db.cart, { foreignKey: 'cartID' });
// db.product.hasMany(db.cartItem, { foreignKey: 'productID' });
// db.cartItem.belongsTo(db.product, { foreignKey: 'productID' });
// Learn more about associations here: https://sequelize.org/master/manual/assocs.html

// db.user.hasMany(db.cart, { foreignKey: 'userID' });
// db.cart.belongsTo(db.user, { foreignKey: 'userID' });
// // Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });
}



module.exports = db;
