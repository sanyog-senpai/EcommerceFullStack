import jwt from "jsonwebtoken"
import { User } from '../user/user.entity.js'

// IsSeller
export const isSeller = async (req, res, next) => {
   // * Phase 1: Authorize user
   // extract token from headers
   const authorization = req?.headers?.authorization;
   const splittedArray = authorization?.split(" ")
   const token = splittedArray.length === 2 && splittedArray[1];


   // if not token, terminate
   if (!token) {
      return res.status(401).send({ message: "Unauthorized" })
   }

   // decrypt token and extract email
   try {
      // find user by email
      const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)
      console.log(userData);

      const user = await User.findOne({ email: userData.email })

      // if not user, terminate
      if (!user) {
         return res.status(401).send({ message: "Unauthorized User" })
      }

      // user role must be seller
      if (user.role !== "seller") {
         return res.status(401).send({ message: "You must be seller to create product" })
      }
      // add user to req
      req.loggedInUser = user;

      next();

   } catch (error) {
      // if something goes wrong while decrypting, terminate
      return res.status(401).send({ message: "Unauthorized" })
   }
}

// IsUser
export const isUser = async (req, res, next) => {
   // * Phase 1: Authorize user
   // extract token from headers
   const authorization = req?.headers?.authorization;
   const splittedArray = authorization?.split(" ")
   const token = splittedArray.length === 2 && splittedArray[1];


   // if not token, terminate
   if (!token) {
      return res.status(401).send({ message: "Unauthorized" })
   }

   // decrypt token and extract email
   try {
      // find user by email
      const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)
      console.log(userData);

      const user = await User.findOne({ email: userData.email })

      // if not user, terminate
      if (!user) {
         return res.status(401).send({ message: "Unauthorized" })
      }

      // add user to req
      req.userInfo = user;

      next();

   } catch (error) {
      // if something goes wrong while decrypting, terminate
      return res.status(401).send({ message: "Unauthorized" })
   }
}

// IsBuyer
export const isBuyer = async (req, res, next) => {
   // * Phase 1: Authorize user
   // extract token from headers
   const authorization = req?.headers?.authorization;
   const splittedArray = authorization?.split("")
   const token = splittedArray.length === 2 && splittedArray[1]

   // if not token, terminate
   if (!token) {
      return res.status(401).send({ message: "Unauthorized" })
   }

   // decrypt token and extract email
   try {
      // find user by email
      const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)
      // console.log(userData);

      const user = await User.findOne({ email: userData.email })

      // if not user, terminate
      if (!user) {
         return res.status(401).send({ message: "Unauthorized" })
      }

      // user role must be buyer
      if (user.role !== "buyer") {
         return res.status(401).send({ message: "Unauthorized" })
      }

      next();

   } catch (error) {
      // if something goes wrong while decrypting, terminate
      return res.status(401).send({ message: "Unauthorized" })
   }
}