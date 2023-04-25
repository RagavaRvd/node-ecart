const mongoose = require("mongoose");

// Create a category schema
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    subcategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },
    ],
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Create a subcategory schema
const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

// Create a product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },
  keywords: [String],
});

// Create a keyword index on the product schema for searching
productSchema.index({ name: "text", description: "text", keywords: "text" });

// Create a category model
const Category = mongoose.model("Category", categorySchema);

// Create a subcategory model
const Subcategory = mongoose.model("Subcategory", subcategorySchema);

// Create a product model
const Product = mongoose.model("Product", productSchema);

module.exports = {
  Category,
  Subcategory,
  Product,
};
