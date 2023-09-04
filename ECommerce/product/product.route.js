import express from "express";
import { isBuyer, isSeller, isUser } from "../auth/auth.middleware.js";
import { addProduct, deleteProduct, getProductDetails, getAllProducts, getSellerProducts } from "./product.service.js";

const router = express.Router()

// Add Product
router.post("/product/create", isSeller, addProduct)

// Delete Product
router.delete("/product/delete/:id", isSeller, deleteProduct)

// Get all Product
router.get("/product/details/:id", isUser, getProductDetails)

// Get Products by Buyer
router.get("/product/buyer/all", isBuyer, getAllProducts)

// Get Products by Seller
router.post("/product/seller/all", isSeller, getSellerProducts)

// edit product
// seller
// can edit own product


export default router