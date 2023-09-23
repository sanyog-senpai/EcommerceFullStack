/* eslint-disable react/no-unescaped-entities */
import SendIcon from "@mui/icons-material/Send";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
	Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "../../../src/App.css";
import "../../../src/index.css";
import { loginUser } from "../../lib/apis/user.apis";
import {
	openErrorSnackbar,
	openSuccessSnackbar,
} from "../../store/slices/snackbarSlices";

export const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [showPassword, setShowPassword] = React.useState(false);

	// Login Mutation
	const loginMutation = useMutation({
		mutationKey: ["login"],
		mutationFn: (values) => loginUser(values),
		onSuccess: (res) => {
			// console.log(res);
			localStorage.setItem("accesstoken", res?.data?.accessToken);
			localStorage.setItem("userRole", res?.data?.user?.role);
			localStorage.setItem("userName", res?.data?.user?.firstName);
			navigate("/home");
			dispatch(openSuccessSnackbar("You are logged in successfully"));
		},
		onError: (error) => {
			dispatch(openErrorSnackbar(error?.response?.data?.message));
		},
	});

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<>
			<div className="form-container">
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
						// try {
						// 	setLoading(true);
						// 	// Hit Route
						// 	const response = await $axios.post("/user/login", values);
						// 	// console.log(response);
						// 	setLoading(false);
						// 	// extract accesstoken
						// 	const accesstoken = response.data.accessToken;
						// 	// save accesstoken to local storage
						// 	localStorage.setItem("accesstoken", accesstoken);
						// 	localStorage.setItem("isLoggedIn", true);
						// 	// console.log(localStorage.getItem("isLoggedIn"));
						// 	// user fullName
						// 	const userName =
						// 		response?.data?.user?.firstName +
						// 		" " +
						// 		response?.data?.user?.lastName;
						// 	// save user name and role in local storage
						// 	localStorage.setItem("fullName", userName);
						// 	localStorage.setItem(
						// 		"userRole",
						// 		response?.data?.user?.role
						// 	);
						// 	// firstName and lastName
						// 	localStorage.setItem(
						// 		"firstName",
						// 		response?.data?.user?.firstName
						// 	);
						// 	localStorage.setItem(
						// 		"lastName",
						// 		response?.data?.user?.lastName
						// 	);
						// 	// push to home page
						// 	navigate("/");
						// } catch (error) {
						// 	setErrorInfo({
						// 		isError: true,
						// 		errorMessage: error.response.data.message,
						// 	});
						// 	console.log(error.response.data.message);
						// 	setLoading(false);
						// }
						loginMutation.mutate(values);
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
								disabled={loginMutation.isLoading}
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
