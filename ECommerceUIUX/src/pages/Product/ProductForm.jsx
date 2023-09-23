import SendIcon from "@mui/icons-material/Send";
import { Box, CircularProgress, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import { Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "../../../src/App.css";
import "../../../src/index.css";
import { addProductBySeller } from "../../lib/apis/product.apis";
import { openErrorSnackbar } from "../../store/slices/snackbarSlices";

const productCategories = [
	"grocery",
	"kitchen",
	"clothing",
	"electronics",
	"furniture",
	"cosmetics",
	"bakery",
	"liquor",
];

const colorList = [
	"black",
	"white",
	"green",
	"blue",
	"orange",
	"yellow",
	"brown",
	"red",
	"purple",
	"pink",
	"grey",
];

export const ProductForm = () => {
	const [age, setAge] = React.useState("");

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	const addProductMutation = useMutation({
		mutationKey: ["add-product"],
		mutationFn: (values) => addProductBySeller(values),
		onSuccess: () => {
			navigate("/products");
			dispatch(openErrorSnackbar("Product added successfully!!"));
		},
		onError: (error) => {
			dispatch(
				openErrorSnackbar(
					error?.response?.data?.message || "Something went wrong."
				)
			);
		},
	});
	// console.log(addProductMutation);

	if (addProductMutation.isLoading) {
		return (
			<>
				<div className="loader">
					<CircularProgress />
				</div>
			</>
		);
	}

	// Radio: String to Boolean
	let radioData = "false";
	let stringToBoolean = (radioData) => {
		if (radioData && typeof radioData === "string") {
			if (radioData.tolowercase() === "true") return true;
			if (radioData.tolowercase() === "false") return "false";
		}
		return radioData;
	};
	console.log(radioData);

	return (
		<>
			<div className="form-container">
				<Formik
					initialValues={{
						name: "",
						price: "",
						freeShipping: false,
						company: "",
						quantity: "",
						// color: "",
						category: "",
					}}
					validationSchema={Yup.object({
						name: Yup.string()
							.min(2, "Name must be at least 2 characters")
							.max(55, "Name must be less than 55 characters")
							.trim()
							.required("Name is Required"),
						price: Yup.number()
							.min(0, "Price cannot be less than or equal to 0")
							.required("Specify Price"),
						freeShipping: Yup.boolean(), //default false
						company: Yup.string()
							.min(2, "Company must be at least 2 characters")
							.max(55, "Company must be at least 2 characters")
							.trim()
							.required("Company is Required"),
						quantity: Yup.number().min(1).required("Mention Quantity"),
						// color: Yup.array().of(Yup.string().trim().lowercase()),
						category: Yup.string()
							.trim()
							.required("Category is required")
							.oneOf(productCategories),
					})}
					onSubmit={async (values) => {
						addProductMutation.mutate(values);

						console.log(values);
					}}
				>
					{(formik) => (
						<form onSubmit={formik.handleSubmit} className="form-card">
							<h2 className="title">Product Form</h2>
							{/* Product Name */}
							<div>
								<TextField
									className="w-100"
									label="Product Name"
									variant="outlined"
									name="name"
									type="text"
									{...formik.getFieldProps("name")}
								/>
								{formik.touched.name && formik.errors.name ? (
									<div className="error-message">
										{formik.errors.name}
									</div>
								) : null}
							</div>

							{/* Price and Shipping */}
							<Box sx={{ display: "flex", gap: "1rem" }}>
								<div>
									<TextField
										className="w-100"
										label="Price"
										variant="outlined"
										name="price"
										type="number"
										{...formik.getFieldProps("price")}
									/>
									{formik.touched.price && formik.errors.price ? (
										<div className="error-message">
											{formik.errors.price}
										</div>
									) : null}
								</div>

								<div>
									<FormControl>
										<FormLabel id="demo-radio-buttons-group-label">
											Shipping
										</FormLabel>
										<RadioGroup
											row
											aria-labelledby="demo-radio-buttons-group-label"
											defaultValue={false}
											name="freeShipping"
											{...formik.getFieldProps("freeShipping")}
										>
											<FormControlLabel
												value={true}
												control={<Radio />}
												label="Yes"
												// onChange={() => {
												// 	formik.setFieldValue(
												// 		"freeShipping",
												// 		radioData
												// 	);
												// }}
												onClick={(event) => {
													const value = event.target.value;
													const freeShipping =
														value === "true" ? true : false;
													formik.setFieldValue(
														"freeShipping",
														freeShipping
													);
												}}
											/>
											<FormControlLabel
												value={false}
												control={<Radio />}
												label="No"
												// onChange={() => {
												// 	formik.setFieldValue(
												// 		"freeShipping",
												// 		radioData
												// 	);
												// }}
												onClick={(event) => {
													const value = event.target.value;
													const freeShipping =
														value === "false" ? false : true;
													console.log({ freeShipping });
													formik.setFieldValue(
														"freeShipping",
														freeShipping
													);
												}}
											/>
										</RadioGroup>
									</FormControl>
									{formik.touched.freeShipping &&
									formik.errors.freeShipping ? (
										<div className="error-message">
											{formik.errors.freeShipping}
										</div>
									) : null}
								</div>
							</Box>

							{/* Company */}
							<div>
								<TextField
									className="w-100"
									label="Company"
									variant="outlined"
									name="company"
									type="text"
									{...formik.getFieldProps("company")}
								/>
								{formik.touched.company && formik.errors.company ? (
									<div className="error-message">
										{formik.errors.company}
									</div>
								) : null}
							</div>

							{/* Quantity */}
							<div>
								<TextField
									className="w-100"
									label="Quantity"
									variant="outlined"
									name="company"
									type="number"
									{...formik.getFieldProps("quantity")}
								/>
								{formik.touched.quantity && formik.errors.quantity ? (
									<div className="error-message">
										{formik.errors.quantity}
									</div>
								) : null}
							</div>

							{/* Color */}
							{/* <div>
								<TextField
									className="w-100"
									label="Color"
									variant="outlined"
									name="color"
									type="text"
									{...formik.getFieldProps("color")}
								/>
								{formik.touched.color && formik.errors.color ? (
									<div className="error-message">
										{formik.errors.color}
									</div>
								) : null}
							</div> */}

							{/* Category */}
							<div>
								<FormControl sx={{ width: "25rem" }}>
									<InputLabel id="demo-simple-select-label">
										Category
									</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={age}
										label="Category"
										onChange={handleChange}
										{...formik.getFieldProps("category")}
									>
										{productCategories.map((item, index) => {
											return (
												<MenuItem value={item} key={index}>
													{item}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
								{formik.touched.category && formik.errors.category ? (
									<div className="error-message">
										{formik.errors.category}
									</div>
								) : null}
							</div>

							{console.log(formik.values)}

							<Button
								sx={{ width: "8.5rem", margin: "0 auto" }}
								color="success"
								size="medium"
								variant="contained"
								endIcon={<SendIcon />}
								type="submit"
							>
								Submit
							</Button>
						</form>
					)}
				</Formik>
			</div>
		</>
	);
};
