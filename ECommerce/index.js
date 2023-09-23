import express from "express"
import { dbConnect } from "./database/db_connect.js";
import userRoutes from "./user/user.routes.js"
import categoryRoutes from './category/category.routes.js'
import productRoutes from './product/product.route.js'
import cartRoutes from './cart/cart.routes.js'

const app = express()

// making express to know json
app.use(express.json())


// CORS
app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
   );

   if (req.method === "OPTIONS") {
      res.header("Access-Control-Expose-Headers", "accessToken, refreshToken,");
      res.header(
         "Access-Control-Allow-Methods",
         "PUT, POST, PATCH, DELETE, GET, OPTIONS"
      );
      return res.status(200).json({});
   }

   return next();
});

// Database Connection
dbConnect()

// User Route
app.use(userRoutes)

// Category Route
app.use(categoryRoutes)

// Product Route
app.use(productRoutes)

// Cart Route
app.use(cartRoutes)

// console.log(process.env)   //env-cmd package info
const port = process.env.API_PORT;

app.listen(port, () => {
   console.log(`App listening to port:${port}`)
})