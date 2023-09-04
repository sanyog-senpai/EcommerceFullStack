import React from "react";
import SellerProduct from "./SellerProduct";
import BuyerProduct from "./BuyerProduct";

const Product = () => {
	const role = localStorage.getItem("userRole");

	// if (role === "seller") {
	// 	return <SellerProduct />;
	// }
	// return <BuyerProduct />;

	return (
		<div className="container">
			{role === "seller" ? <SellerProduct /> : <BuyerProduct />}
		</div>
	);
};

export default Product;
