import { User } from './user.entity.js'
import { loginValidationSchema, userValidationSchema } from "./user.validation.js";
import Joi from 'joi';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Cart } from '../cart/cart.entity.js';

export const registerUser = async (req, res) => {
   // New User from body
   let newUser = req.body;
   // console.log(newUser)

   // Validate data
   try {
      await userValidationSchema.validateAsync(newUser)
   } catch (error) {
      return res.status(400).send({ message: error.message })
   }

   // Check if user with email exists
   const user = await User.findOne({ email: newUser.email })

   // if user exists , throw error
   if (user) {
      return res.status(409).send({ message: "Email address already in use" })
   }

   // password => hash using bcrypt
   const hashedPassword = await bcrypt.hash(newUser.password, 8)

   // Replace password with hashedPassword
   newUser.password = hashedPassword;

   // Create user with hashed password
   await User.create(newUser)

   // Send appropriate response
   return res.status(200).send({ message: "User Registration Successfully!" })
}

export const loginUser = async (req, res) => {
   // extract email and password from request body
   const loginCredentials = req.body;
   // console.log(loginCredentials)

   // Validate data
   try {
      await loginValidationSchema.validateAsync(loginCredentials)
   } catch (error) {
      return res.status(400).send({ message: error.message })
   }

   // find user with email
   const user = await User.findOne({ email: loginCredentials.email })

   // if not user, throw error
   if (!user) {
      return res.status(404).send({ message: "Invalid Credentials" })
   }

   // compare password with hashed password
   const passwordMatch = await bcrypt.compare(loginCredentials.password, user.password)
   // console.log(passwordMatch)

   // password validation
   if (!passwordMatch) {
      return res.status(404).send({ message: "Invalid Credentials" })
   }

   // generate access token
   const accessToken = jwt.sign({ email: user.email }, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: "1d"
   })
   // console.log(accessToken);

   // removing password
   user.password = undefined;

   return res.status(200).send({
      user,
      accessToken
   })
}