/* eslint-disable react/prop-types */
import { Pagination } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBuyerProducts } from "../../lib/apis/product.apis";
import { openErrorSnackbar } from "../../store/slices/snackbarSlices";
import NotFound from "../NotFound.jsx";
import ProductCard from "./ProductCard";

const BuyerProduct = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [page, setPage] = useState(1);

	const { isLoading, error, isError, data } = useQuery({
		queryKey: ["buyer-products", page, props.searchText],
		queryFn: () =>
			getBuyerProducts({
				page: page,
				limit: 10,
				searchText: props?.searchText || "",
			}),
	});
	console.log(data);

	const getPaginationData = (event, data) => {
		// console.log(data);
		setPage(data);
	};

	if (isError) {
		dispatch(
			openErrorSnackbar(
				error?.response?.data?.message ||
					"Product cannot be fetched at this time."
			)
		);
	}

	return (
		<>
			<div>
				{!isLoading && data?.data?.products?.length === 0 ? (
					<NotFound />
				) : (
					<>
						<div className="card-container">
							{data?.data?.products?.map((item) => {
								return <ProductCard key={item._id} {...item} />;
							})}
						</div>
						<div className="container flex-center">
							<Pagination
								className="my-2"
								page={page}
								count={data?.data?.totalPage}
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

export default BuyerProduct;
