import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { $axios } from "../../lib/axios";

const BuyerProduct = () => {
	const [loading, setLoading] = useState(false);
	const [product, setProducts] = useState([]);

	// fetch products
	const fetchProducts = async () => {
		try {
			setLoading(true);
			const response = await $axios.post("/product/buyer/all", {
				page: 1,
				limit: 10,
			});
			setProducts(response.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error.response.data);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	if (loading) {
		return (
			<div className="loader">
				<CircularProgress />
			</div>
		);
	}

	return <div>Buyer Product</div>;
};

export default BuyerProduct;
