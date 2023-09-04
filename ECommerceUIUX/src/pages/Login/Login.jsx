/* eslint-disable react/no-unescaped-entities */
import SendIcon from "@mui/icons-material/Send";
import {
	Alert,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
	Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import "../../../src/App.css";
import "../../../src/index.css";
import { $axios } from "../../lib/axios";
import { Link, useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import CustomSnackbar from "../../components/CustomSnackbar";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

export const Login = () => {
	const [loading, setLoading] = useState(false);
	const [errorInfo, setErrorInfo] = useState({
		isError: false,
		errorMessage: "",
	});

	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const navigate = useNavigate();
	return (
		<>
			<div className="form-container">
				<CustomSnackbar
					open={errorInfo.isError}
					status="error"
					message={errorInfo.errorMessage}
				/>
				<Formik
					initialValues={{ email: "", password: "" }}
					validationSchema={Yup.object({
						email: Yup.string()
							.email("Invalid email address")
							.required("Email is Required"),
						password: Yup.string()
							.trim()
							.required("Password is Required"),
					})}
					onSubmit={async (values) => {
						// console.log(values);

						// API hit
						try {
							setLoading(true);

							// Hit Route
							const response = await $axios.post("/user/login", values);
							// console.log(response);

							setLoading(false);

							// extract accesstoken
							const accesstoken = response.data.accessToken;

							// save accesstoken to local storage
							localStorage.setItem("accesstoken", accesstoken);
							localStorage.setItem("isLoggedIn", true);
							// console.log(localStorage.getItem("isLoggedIn"));

							// user fullName
							const userName =
								response?.data?.user?.firstName +
								" " +
								response?.data?.user?.lastName;

							// save user name and role in local storage
							localStorage.setItem("fullName", userName);
							localStorage.setItem(
								"userRole",
								response?.data?.user?.role
							);

							// firstName and lastName
							localStorage.setItem(
								"firstName",
								response?.data?.user?.firstName
							);
							localStorage.setItem(
								"lastName",
								response?.data?.user?.lastName
							);

							// push to home page
							navigate("/");
						} catch (error) {
							setErrorInfo({
								isError: true,
								errorMessage: error.response.data.message,
							});
							console.log(error.response.data.message);
							setLoading(false);
						}
					}}
				>
					{(formik) => (
						<form onSubmit={formik.handleSubmit} className="form-card">
							<h2 className="title">Login</h2>

							<div>
								<TextField
									className="w-100"
									label="Email Address"
									variant="outlined"
									name="email"
									type="email"
									{...formik.getFieldProps("email")}
								/>
								{formik.touched.email && formik.errors.email ? (
									<div className="error-message">
										{formik.errors.email}
									</div>
								) : null}
							</div>

							<div>
								<FormControl className="w-100" variant="outlined">
									<InputLabel htmlFor="outlined-adornment-password">
										Password
									</InputLabel>
									<OutlinedInput
										id="outlined-adornment-password"
										type={showPassword ? "text" : "password"}
										name="password"
										label="Password"
										{...formik.getFieldProps("password")}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
													edge="end"
												>
													{showPassword ? (
														<VisibilityOff />
													) : (
														<Visibility />
													)}
												</IconButton>
											</InputAdornment>
										}
									/>
								</FormControl>
								{formik.touched.password && formik.errors.password ? (
									<div className="error-message">
										{formik.errors.password}
									</div>
								) : null}
							</div>

							<Button
								sx={{ width: "8.5rem", margin: "0 auto" }}
								color="success"
								size="medium"
								variant="contained"
								endIcon={<SendIcon />}
								type="submit"
								disabled={loading}
							>
								Send
							</Button>
							{/* {console.log(formik.values)} */}
							<Divider />
							<Link to="/register">
								<Typography>Don't have an account?</Typography>
							</Link>
						</form>
					)}
				</Formik>
			</div>
		</>
	);
};
