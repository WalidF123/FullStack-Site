//const { cart } = require("..");

module.exports = (sequelize, DataTypes) => 
    sequelize.define('orderHistory', {
      orderHistoryID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      cartItemID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'cartItems',
          key: 'cartItemID'
        }
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'userID'
        }
      },
      productID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        }
      },
      productName: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        
      }
    }, {
      timestamps: false,
      //tableName: 'cartItem'
    });
   //return cartItem;
  