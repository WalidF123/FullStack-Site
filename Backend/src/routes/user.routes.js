const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller.js');

// Select all users.
router.get("/", controller.all);

// Select a single user with id.
router.get("/select/:id", controller.one);

// Select one user from the database if username and password are a match.
router.get("/login", controller.login);

// Create a new user.
router.post("/", controller.create);
router.get("/findBy", controller.findByEmail);
// Add this route
router.get("/check-email", controller.checkEmailUnique);
module.exports = router;
