import Joi from 'joi'

export const addProductValidationSchema = Joi.object({
   name: Joi.string().min(2).max(55).trim().required(),
   company: Joi.string().min(2).max(55).trim().required(),
   price: Joi.number().min(0).required(),
   freeShipping: Joi.boolean().required(),
   quantity: Joi.number().min(1).required().integer(),
   category: Joi.string().trim().required().valid("grocery", "kitchen", "clothing", "electronics", "furniture", "cosmetics", "bakery", "liquor"),
   color: Joi.array().items(Joi.string().trim().lowercase())
})


export const getAllProductsValidation = Joi.object({
   page: Joi.number().min(1).integer().required(),
   limit: Joi.number().min(1).integer().required()
})