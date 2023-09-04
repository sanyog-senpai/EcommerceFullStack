import mongoose from "mongoose"

const dbUrl = process.env.MONGO_URL

export const dbConnect = async () => {
   try {
      await mongoose.connect(dbUrl)
      console.log("Database Connected Successfully")
   } catch (error) {
      console.log("Database Connection failed ")
      console.log(error.message)
   }
}