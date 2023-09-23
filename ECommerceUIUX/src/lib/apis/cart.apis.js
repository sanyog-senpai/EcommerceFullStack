import { $axios } from "../axios.js"

export const addItemToCart = async (values) => {
   return await $axios.post("/cart/add/item", values)
}