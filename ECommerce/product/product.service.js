import { checkMongooseIdValidity } from "../utils/utils.js";
import { Product } from './product.entity.js';
import { checkIfProductExists, isOwnerOfProduct } from "./product.functions.js";
import { addProductValidationSchema, getAllProductsValidation } from "./product.validation.js";

// Add Product
export const addProduct = async (req, res) => {

   // * Phase 2: Product add
   // extract new product from req.body
   const newProduct = req.body;

   // validate new product
   try {
      await addProductValidationSchema.validateAsync(newProduct)
   } catch (error) {
      return res.status(400).send({ message: error.message })
   }
   // console.log(req.userInfo._id)

   // adding sellerId to request
   newProduct.sellerId = req.loggedInUser._id

   // add product
   await Product.create(newProduct)
   res.status(200).send({ message: "Product added successfully" })
}

// Delete Product
export const deleteProduct = async (req, res) => {
   try {
      // extract id from params
      const productId = req.params.id;

      // validate id for mongo id validity
      const isValidMongoId = checkMongooseIdValidity(productId)

      // if not valid id, terminate
      if (!isValidMongoId) {
         // ! throw new Error("Invalid MongoId")
         return res.status(400).send({ message: "Invalid Mongo Id" })
      }

      // check product existence
      const product = await checkIfProductExists({ _id: productId })

      const loggedInUserId = req.loggedInUser._id;

      // Logged in user must be owner of that product
      isOwnerOfProduct(loggedInUserId, product.sellerId)

      // Delete Product
      await Product.deleteOne({ _id: productId })

      res.status(200).send({ message: "Product deleted successfully" })
   } catch (error) {
      res.status(500).send({ message: error.message })
   }
}

// Get Product Details
export const getProductDetails = async (req, res) => {
   // extract product id from params.req
   const productId = req.params.id;

   // validate id for mongo id validity
   const isValidMongoId = checkMongooseIdValidity(productId)

   // if not valid id, terminate
   if (!isValidMongoId) {
      // ! throw new Error("Invalid MongoId")
      return res.status(400).send({ message: "Invalid Mongo Id" })
   }

   // check if product exists
   const product = await Product.findOne({ _id: productId })

   // if not product, terminate
   if (!product) {
      return res.status(404).send({ message: "Product does not exists" })
   }

   // return product
   return res.status(200).send(product)
}

// Get All Products
export const getAllProducts = async (req, res) => {
   // extract query params from req.body
   const query = req.body
   // console.log(query);

   // validate query params
   try {
      await getAllProductsValidation.validateAsync(query)
   } catch (error) {
      // if not valid, terminate
      return res.status(400).send({ message: error.message })
   }

   // Match
   // * let match = query.searchText ? { name: { $regex: query.searchText, $options: "i" } } : {}
   let match = {};
   if (query?.searchText) {
      match.name = { $regex: query.searchText, $options: "i" };
   }

   // Price
   let price = {}
   if (query?.minPrice) {
      price = { $gte: query.minPrice }
   }
   if (query?.maxPrice) {
      price = { ...price, $lte: query.maxPrice }
   }

   match.price = price;

   if (query?.category?.length) {
      match.category = { $in: query.category }
   }
   // console.log(match);


   // find products
   // calculate skip
   const skip = (query.page - 1) * query.limit;

   const products = await Product.aggregate([
      {
         $match: match,
      },
      {
         $skip: skip,
      },
      {
         $limit: query.limit
      }
   ])

   // pagination count
   const totalItems = await Product.find({}).count()
   const totalPage = Math.ceil(totalItems / query.limit);

   // return product
   return res.status(200).send({ products, totalPage })
}

// Get Seller Products
export const getSellerProducts = async (req, res) => {
   const query = req.body

   const sellerIdFromAuthMiddleware = req.loggedInUser._id;

   try {
      await getAllProductsValidation.validateAsync(query)
   } catch (error) {
      return res.status(400).send({ message: error.message })
   }

   let match = query.searchText ? {
      sellerId: sellerIdFromAuthMiddleware,
      name: { $regex: query.searchText, $options: 'i' }
   } : {
      sellerId: sellerIdFromAuthMiddleware
   }

   const skip = (query.page - 1) * query.limit;

   const products = await Product.aggregate([
      {
         $match: match,
      },
      {
         $skip: skip,
      },
      {
         $limit: query.limit
      },
      {
         $project: {
            name: 1,
            company: 1,
            price: 1,
            category: 1,
            sellerId: 1,
         }
      }
   ])

   const totalProducts = await Product.find({ sellerId: sellerIdFromAuthMiddleware }).count();

   const totalPage = Math.ceil(totalProducts / query.limit);

   return res.status(200).send({ products, totalPage })
}