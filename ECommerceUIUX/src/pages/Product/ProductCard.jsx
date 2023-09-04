/* eslint-disable react/prop-types */
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import * as React from "react";

import { Chip, CircularProgress, Grid, Popover, Stack } from "@mui/material";
import "../../App.css";
import { $axios } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { deleteSellerProduct } from "../../lib/apis/product.apis";

const ProductCard = (props) => {
	// Error State
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { _id, name, price, category, company } = props;

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	// Delete Product using react query
	const deleteProductMutation = useMutation({
		mutationKey: ["delete-product"],
		mutationFn: () => deleteSellerProduct(_id),
		onSuccess: () => {
			queryClient.invalidateQueries("seller-product");
		},
	});
	// console.log(deleteProductMutation);

	if (deleteProductMutation.isLoading) {
		return (
			<div className="loader">
				<CircularProgress />
			</div>
		);
	}

	return (
		<>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "center",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "center",
					horizontal: "right",
				}}
			>
				<Grid sx={{ padding: "1rem" }}>
					<Typography sx={{ pb: 1 }}>
						Are you sure to delete this product?
					</Typography>
					<Stack
						direction="row"
						spacing={2}
						sx={{ justifyContent: "center" }}
					>
						<Button
							variant="outlined"
							onClick={() => {
								handleClose();
								deleteProductMutation.mutate();
							}}
						>
							Yes
						</Button>
						<Button
							variant="outlined"
							onClick={() => {
								handleClose();
							}}
						>
							No
						</Button>
					</Stack>
				</Grid>
			</Popover>
			<Card className="product-card" variant="outlined" sx={{ width: 320 }}>
				<div>
					<Typography level="title-lg">{name}</Typography>
					<Typography level="body-sm">
						{company}
						<Chip
							size="small"
							label={category}
							color="success"
							variant="outlined"
							sx={{ marginLeft: "1rem" }}
						/>
					</Typography>
					<IconButton
						aria-label={name}
						variant="secondary"
						color="neutral"
						size="sm"
						onClick={(event) => {
							handleClick(event);
							deleteProductMutation.mutate();
						}}
						sx={{
							position: "absolute",
							top: "0.875rem",
							right: "0.2rem",
						}}
					>
						<DeleteOutlineIcon color="error" />
					</IconButton>
				</div>
				<AspectRatio
					minHeight="120px"
					maxHeight="200px"
					sx={{ cursor: "pointer" }}
					onClick={() => navigate(`/product/details/${_id}`)}
				>
					<img
						src="https://m.media-amazon.com/images/I/61XDeaOrrKL._AC_SX679_.jpg"
						srcSet="https://m.media-amazon.com/images/I/61XDeaOrrKL._AC_SX679_.jpg 2x"
						loading="lazy"
						alt={name}
					/>
				</AspectRatio>
				<CardContent orientation="horizontal">
					<div className="text-truncate-4 product-description">
						Get your head in the game with Samsung G5 Odyssey’s high
						performance lineup of Quad HD curved gaming monitors. The G5
						range hosts a variety of next-level performance and visual
						upgrades at a fantastic price point, allowing gamers to pick
						and choose the gaming monitor that’s best for the games they
						love to play. Samsung Odyssey’s 1000R panel matches the
						curvature of the human eye for maximum immersion and minimal
						eye strain, while the Express 144Hz refresh rate means that
						topping leader boards has never felt so good. With WQHD
						resolution, make your gaming world more lifelike than ever
						before.
					</div>
				</CardContent>
				<CardContent orientation="horizontal">
					<div>
						<Typography level="body-xs">Price:</Typography>
						<Typography fontSize="lg" fontWeight="lg">
							Rs.{price}
						</Typography>
					</div>
					<Button
						variant="solid"
						size="md"
						color="primary"
						aria-label="Explore Bahamas Islands"
						sx={{
							ml: "auto",
							alignSelf: "center",
							fontWeight: 600,
						}}
						onClick={() => navigate(`/product/details/${_id}`)}
					>
						Explore
					</Button>
				</CardContent>
			</Card>
		</>
	);
};

export default ProductCard;
