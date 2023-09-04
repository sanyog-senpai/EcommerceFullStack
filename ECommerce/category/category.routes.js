import express from 'express'
import jwt from "jsonwebtoken"
import { User } from "../user/user.entity.js"
import { Category } from "../category/category.entity.js"
import Joi from 'joi'

const router = express.Router()

// Add Category
router.post("/create/category", async (req, res) => {
   // extract header
   const authorization = req.headers.authorization;

   const splittedArray = authorization?.split(" ");

   const token = splittedArray[1];

   if (!token) {
      res.status(401).send({ message: "Unauthorized" })
   }

   // Decrypt token
   try {
      const data = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)
      const user = User.findOne({ email: data.email })
      if (!user) {
         res.status(401).send({ message: "Unauthorized" })
      }
   } catch (error) {
      res.status(401).send({ message: "Unauthorized" })
   }

   // after user verification
   const newCategory = req.body;

   // validate req.body
   const schema = Joi.object({
      name: Joi.string().required().trim().lowercase(),
   })

   try {
      await schema.validateAsync(newCategory)
   } catch (error) {
      res.status(400).send({ message: error.message })
   }

   await Category.create(newCategory)

   res.status(200).send({ message: "Category added successfully" })
})

export default router