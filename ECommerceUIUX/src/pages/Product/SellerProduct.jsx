/* eslint-disable react-hooks/exhaustive-deps */
import { Button, CircularProgress, Pagination } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../../components/CustomSnackbar";
import { fetchSellerProducts } from "../../lib/apis/product.apis.js";
import NotFound from "../NotFound";
import ProductCard from "./ProductCard";

const SellerProduct = () => {
	const [page, setPage] = useState(1);
	console.log(page);

	const navigate = useNavigate();

	const getPaginationData = (event, data) => {
		// console.log(data);
		setPage(data);
	};

	// Query
	const getSellerProductQuery = useQuery({
		// Re fetches page with dependent to page
		queryKey: ["seller-products", { page }],
		queryFn: () => fetchSellerProducts({ page, limit: 4 }),
		keepPreviousData: true,
	});
	console.log(getSellerProductQuery);

	if (getSellerProductQuery.isLoading) {
		return (
			<div className="loader">
				<CircularProgress />
			</div>
		);
	}
	return (
		<>
			<div>
				<CustomSnackbar
					open={getSellerProductQuery.isError}
					status="error"
					message="Products cannot be fetched at this time"
				/>
				{!getSellerProductQuery.isLoading &&
				getSellerProductQuery.data.data.products.length === 0 ? (
					<NotFound />
				) : (
					<>
						<div className="space-between my-2">
							<div className="title">
								<h3>Products</h3>
							</div>
							<div className="button">
								<Button
									variant="outlined"
									onClick={() => navigate("/product/add")}
								>
									Add products
								</Button>
							</div>
						</div>
						<div className="card-container">
							{getSellerProductQuery?.data?.data?.products?.map(
								(item) => {
									return (
										<>
											<ProductCard key={item._id} {...item} />
										</>
									);
								}
							)}
						</div>
						<div className="container flex-center">
							<Pagination
								page={page}
								count={getSellerProductQuery?.data?.data?.totalPage}
								color="primary"
								onChange={getPaginationData}
							/>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default SellerProduct;
