const express = require("express");
const cors = require("cors");
const db = require("./src/database");

// Database will be sync'ed in the background.
db.sync();

const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Add CORS suport.
app.use(cors());

// Simple Hello World route.
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Add user routes.
const userRoutes = require("./src/routes/user.routes");
app.use("/api/users", userRoutes);

// Add product routes.x
const productRoutes = require("./src/routes/product.routes");
app.use("/api/products", productRoutes);

// // Add cart routes.
// const cartRoutes = require("./src/routes/cart.routes");
// app.use("/api/carts", cartRoutes);

// Add cart item routes.
const cartItemRoutes = require("./src/routes/cartItem.routes");
app.use("/api/cartItems", cartItemRoutes);

const reviewRoutes = require("./src/routes/review.routes");
app.use("/api/reviews", reviewRoutes);

const orderHistoryRoutes = require("./src/routes/orderHistory.routes");
app.use("/api/orderHistory", orderHistoryRoutes);


// Set port, listen for requests.
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
