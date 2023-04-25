const { Category, Subcategory, Product } = require("../models/Category");

// Create a new category
async function createCategory(req, res) {
  const category = new Category({
    name: req.body.name,
    description: req.body.description,
  });
  await category.save();
  res.status(201).json(category);
}

// Get all categories
async function getCategories(req, res) {
  const categories = await Category.find()
    .populate("subcategories")
    .populate({
      path: "products",
      populate: { path: "category" },
    });
  res.json(categories);
}

// Get a category by ID
async function getCategoryById(req, res) {
  const category = await Category.findById(req.params.id);
  res.json(category);
}

// Update a category
async function updateCategory(req, res) {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(category);
}

// Delete a category
async function deleteCategory(req, res) {
  const category = await Category.findByIdAndDelete(req.params.id);
  res.json(category);
}

// Create a new subcategory
async function createSubcategory(req, res) {
  const subcategory = new Subcategory({
    name: req.body.name,
    category: req.body.categoryId,
  });
  await subcategory.save();
  res.status(201).json(subcategory);
}

// Get all subcategories
async function getSubcategories(req, res) {
  const subcategories = await Subcategory.find().populate("category");
  res.json(subcategories);
}

// Get a subcategory by ID
async function getSubcategoryById(req, res) {
  const subcategory = await Subcategory.findById(req.params.id).populate(
    "category"
  );
  res.json(subcategory);
}

// Update a subcategory
async function updateSubcategory(req, res) {
  const subcategory = await Subcategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json(subcategory);
}

// Delete a subcategory
async function deleteSubcategory(req, res) {
  const subcategory = await Subcategory.findByIdAndDelete(req.params.id);
  res.json(subcategory);
}

// Create a new product
async function createProduct(req, res) {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.categoryId,
    subcategory: req.body.subcategoryId,
    keywords: req.body.keywords,
  });
  await product.save();
  res.status(201).json(product);
}

// Get all products
async function getProducts(req, res) {
  const products = await Product.find()
    .populate("category")
    .populate("subcategory");
  res.json(products);
}

// Get a product by ID
async function getProductById(req, res) {
  const product = await Product.findById(req.params.id)
    .populate("category")
    .populate("subcategory");
  res.json(product);
}

// Update a product
async function updateProduct(req, res) {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(product);
}

// Delete a product
async function deleteProduct(req, res) {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.json(product);
}

module.exports = {
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
};
