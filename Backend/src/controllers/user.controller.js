const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);

  res.json(user);
};
// Find a user by email
exports.findByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    const user = await db.user.findOne({ where: { email } });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error finding user by email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findByPk(req.query.id);

  if(user === null || await argon2.verify(user.password_hash, req.query.password) === false)
    // Login failed.
    res.json(null);
  else
    res.json(user);
};


  
//Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  const existingUser = await db.user.findOne({ where: { email: req.body.email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }
  const user = await db.user.create({
    username: req.body.username,
    password_hash: hash,
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    date_of_birth: req.body.DateOfBirth, // Add date of birth
    date_joined: req.body.dateJoined,
    email: req.body.email,
    isBlocked: req.body.isBlocked,
  });
 // Create a cart for the new user
//     const cart = await db.cart.create({
//       userID: user.userID
//     });

//     res.status(201).json({ user, cart });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
  res.json(user);
};


// Check if email is unique
exports.checkEmailUnique = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await db.user.findOne({ where: { email } });
    if (user) {
      res.json({ isUnique: false });
    } else {
      res.json({ isUnique: true });
    }
  } catch (error) {
    console.error('Error checking email uniqueness:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};