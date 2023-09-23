import express from "express"
import { isBuyer } from "../auth/auth.middleware.js";
import { Product } from "../product/product.entity.js";
import { Cart } from "./cart.entity.js";

const router = express.Router()

// Add item to cart
router.post("/cart/add/item", isBuyer, async (req, res) => {
   const { productId, quantity } = req.body;

   // validate this data
   // TODO:check if product id is mongoID
   // check if product with id exists

   const product = await Product.findOne({ _id: productId })

   if (!product) {
      return res.status(404).send({ message: "Product does not exists" });
   }
   if (!quantity > product.quantity) {
      return res.status(403).send({ message: "Product id out of stock" });
   }

   // Add item to cart of that buyer
   const buyerId = req.loggedInUser._id;
   
   console.log(buyerId);

   await Cart.updateOne(
      // Finds buyerId if there is buyerId,
      {
         buyerId: buyerId,
      },
      // It will push if not,
      {
         $push: {
            productList: { productId, quantity }
         }
      },
      // Update OR Insert item
      {
         upsert: true,
      }
   )
   return res.status(200).send({ message: "Item added to cart" });

})

// Remove item from cart
router.put("/cart/remove/item/:id", isBuyer, async (req, res) => {
   const userId = req.loggedInUser._id;

   const productId = req.params.id;

   // TODO: mongoId validation

   // TODO: Empty Cart

   await Cart.updateOne(
      { buyerId: userId },
      {
         $pull: {
            productList: { productId }
         }
      }
   )
   return res.status(200).send({ message: "Item is removed from card" })
})

// Increase Item quantity via cart
router.put("/cart/update/quantity/:id", isBuyer, async (req, res) => {
   const newQuantity = req.body.newQuantity;

   const productId = req.params.id;

   // TODO: MongoID verification and new quantity validation

   // check product existence
   const product = await Product.findOne({ _id: productId })

   if (!product) {
      return res.status(404).send({ message: "Product does not exist." })
   }

   // buyer is logged in user
   const buyerId = req.loggedInUser._id

   await Cart.updateOne({
      buyerId: buyerId,
      "productList.productId": productId,
   }, {
      $set: {
         "productList.$.quantity.": newQuantity,
      }
   }
   )

   return res.status(200).send({ message: "Cart updated successfully" })

})

export default router;