module.exports = (sequelize, DataTypes) =>
   sequelize.define('user', {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Add auto-increment for userID
    },
    username: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    password_hash: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false
    },
    date_joined: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true // Add uniqueness constraint for email
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  }, {
    timestamps: false,
    //tableName: 'user'
  });
//return user;
