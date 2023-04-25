const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  createSubcategory,
  getSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory,
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/categoryController");

// Category routes
router.post("/categories", createCategory);
router.get("/categories", getCategories);
router.get("/categories/:id", getCategoryById);
router.patch("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

// Subcategory routes
router.post("/subcategories", createSubcategory);
router.get("/subcategories", getSubcategories);
router.get("/subcategories/:id", getSubcategoryById);
router.patch("/subcategories/:id", updateSubcategory);
router.delete("/subcategories/:id", deleteSubcategory);

// Product routes
router.post("/products", createProduct);
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;
