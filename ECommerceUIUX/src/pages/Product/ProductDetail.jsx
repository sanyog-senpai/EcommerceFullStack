/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-irregular-whitespace */
import React, { useEffect, useState } from "react";
import product1 from "/product/Samsung Odessy G9.jpg";
import "../../App.css";
import { Button, Chip, CircularProgress, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
import { $axios } from "../../lib/axios";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProductDetail = (props) => {
	const [productDetail, setProductDetail] = useState({});

	// extract id
	const params = useParams();
	// console.log(params.id);

	const [counter, setCounter] = useState(0);

	const [loading, setLoading] = useState(false);

	const productId = params.id;

	const getProductDetails = async () => {
		try {
			setLoading(true);
			const response = await $axios.get(`/product/details/${productId}`);
			setProductDetail(response.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error.message);
		}
	};

	useEffect(() => {
		getProductDetails();
	}, []);

	if (loading) {
		return (
			<div className="loader">
				<CircularProgress />
			</div>
		);
	}

	return (
		<>
			<div
				className="product-page py-2 container space-between "
				style={{
					width: "75rem",
					background: "#fff",
					padding: "2rem",
					borderRadius: "8px",
					marginTop: "3.5rem",
					boxShadow: "300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
				}}
			>
				<div
					style={{
						background: "white",
						padding: "2rem",
						borderRadius: "6px",
					}}
				>
					<img className="product-image" src={product1} alt="" />
				</div>
				<div className="about-section">
					<Typography variant="h4" sx={{ mt: 1.5 }}>
						{productDetail.name}
					</Typography>
					<Typography
						variant="h4"
						sx={{ color: "#D23F57", fontWeight: "500" }}
					>
						Rs.{productDetail.price}
					</Typography>
					<Typography variant="h6" sx={{ color: "#2b3445" }}>
						Brand: <span>{productDetail.company}</span>
					</Typography>
					<Typography variant="h6" sx={{ color: "#2b3445" }}>
						Quantity: <span>{productDetail.quantity}</span>
					</Typography>
					<Typography variant="h6" sx={{ color: "#2b3445" }}>
						Shipping:
						<span>
							{productDetail.freeShipping === true ? "Yes" : "No"}
						</span>
					</Typography>
					<Typography variant="h6" sx={{ color: "#2b3445" }}>
						Category:
						<Chip
							size="small"
							label={productDetail.category}
							color="success"
							variant="outlined"
							sx={{ marginLeft: "0.9rem", textTransform: "capitalize" }}
						/>
					</Typography>
					<Typography
						variant="p"
						sx={{ color: "#2b3445", fontSize: "14px" }}
					>
						Description:
						<Typography variant="h6" className="text-truncate-4">
							Get your head in the game with the Samsung 49 inch Odyssey
							G9 Gaming Monitor, which matches the curve of the human eye
							for maximum immersion and minimal eye strain. With the
							screen space of two side-by-side monitors, you can truly
							take command on the battlefield. From deepest blacks to
							vivid colors, Samsung QLED ensures pixel perfect picture
							quality with every frame. Utilizing Quantum Dot technology,
							Samsung QLED creates more vivid colors with 125% more color
							space compared to sRGB, ensuring the highest class of color
							reproduction. Dropping frames means dropping chances to put
							your enemy in the dirt. With NVIDIA G-SYNC and FreeSync
							Premium Pro support, Odyssey matches every frame from your
							graphics card, so you’re never caught short from moment to
							moment.​The gaming world of your imagination made real. QHD
							resolution brings you a display as wide as two QHD monitors
							sitting side by side, with incredibly detailed, pin-sharp
							images. Experience a more encompassing view with maximum
							space to take in all the action. Customize your Odyssey
							with distinct core color customization, allowing you to
							match your monitor with the rest of your gamer setup.
						</Typography>
					</Typography>
					<div className="counter flex gap-2">
						<Button
							size="small"
							onClick={() => {
								() => {
									const newCount = counter + 1;
									if (newCount >= productDetail.quantity) {
										// return 1;
										setCounter(productDetail.quantity);
									} else {
										setCounter(newCount);
									}
								};
							}}
						>
							<RemoveIcon size="25" />
						</Button>
						<Typography variant="h5">{counter}</Typography>
						<Button
							size="small"
							onClick={() => {
								const newCount = counter - 1;
								if (newCount <= 0) {
									// return 1;
									setCounter(1);
								} else {
									setCounter(newCount);
								}
							}}
						>
							<AddIcon size="25" />
						</Button>
					</div>
					<div className="gap-2">
						<Button variant="contained" color="primary">
							Buy Me
						</Button>
						<Button variant="contained" color="success">
							<ShoppingCartIcon
								fontSize="small"
								sx={{ marginRight: "8px" }}
							/>
							Add to Cart
						</Button>
						<Button variant="contained" color="warning">
							<EditIcon fontSize="small" sx={{ marginRight: "5px" }} />
							Edit
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductDetail;
