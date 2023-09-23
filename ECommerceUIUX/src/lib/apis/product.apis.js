import { $axios } from "../axios"

export const fetchSellerProducts = async (paginationData) => {
   return await $axios.post("/product/seller/all", paginationData);
}

export const deleteSellerProduct = async (_id) => {
   return await $axios.delete(`/product/delete/${_id}`)
}

export const addProductBySeller = async (values) => {
   return await $axios.post("/product/create", values)
}

export const getBuyerProducts = async (paginationData) => {
   return await $axios.post("/product/buyer/all", paginationData)
}