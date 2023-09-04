import mongoose from "mongoose"

export const checkMongooseIdValidity = (id) => {
   const isValidMongoId = mongoose.Types.ObjectId.isValid(id)

   // if (!isValidMongoId) {
   //    throw new Error("Invalid MongoId")
   // }
   
   return isValidMongoId;
}