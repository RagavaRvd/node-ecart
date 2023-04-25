const express = require("express");
const router = express.Router();

// Import route files
const productRoutes = require("./category");
// const userRoutes = require('./userRoutes');
// const orderRoutes = require('./orderRoutes');

// Use route files
router.use("/products", productRoutes);
// router.use('/users', userRoutes);
// router.use('/orders', orderRoutes);

module.exports = router;
