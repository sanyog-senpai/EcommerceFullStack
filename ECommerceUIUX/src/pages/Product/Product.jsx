import { TextField } from "@mui/material";
import React, { useState } from "react";
import ProductFilter from "../../components/ProductFilter";
import BuyerProduct from "./BuyerProduct";
import SellerProduct from "./SellerProduct";

const Product = () => {
	const role = localStorage.getItem("userRole");

	const [searchText, setSearchText] = useState();

	// if (role === "seller") {
	// 	return <SellerProduct />;
	// }
	// return <BuyerProduct />;

	return (
		<div className="container">
			<div className="search-box">
				<ProductFilter />

				<TextField
					id="outlined-helperText"
					placeholder="Search"
					onChange={(event) => setSearchText(event.target.value)}
					// Place Icon here
				/>
			</div>
			{role === "seller" ? (
				<SellerProduct searchText={searchText} />
			) : (
				<BuyerProduct searchText={searchText} />
			)}
		</div>
	);
};

export default Product;
