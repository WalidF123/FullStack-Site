module.exports = (sequelize, DataTypes) =>
  sequelize.define('review', {
    review_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "userID",
        },
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
        min: 1,
        max: 5,
        },
      },
    review_text: {
        type: DataTypes.TEXT,
        allowNull: false,
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