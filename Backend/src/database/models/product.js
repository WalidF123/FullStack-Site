module.exports = (sequelize, DataTypes) =>
  sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    discountedprice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    actualprice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default:false,
    },
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
