import SendIcon from "@mui/icons-material/Send";
import {
	Box,
	Divider,
	FormControlLabel,
	FormLabel,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Radio,
	RadioGroup,
	Select,
	Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import "../../../src/App.css";
import "../../../src/index.css";
import { Link, useNavigate } from "react-router-dom";
import { $axios } from "../../lib/axios";
import CustomSnackbar from "../../components/CustomSnackbar";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const Register = () => {
	const [errorInfo, setErrorInfo] = useState({
		isError: false,
		errorMessage: "",
	});
	// const [registerInfo, setRegisterInfo] = useState({
	// 	open: false,
	// 	message: "",
	// 	status: "",
	// });
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	return (
		<div className="form-container">
			<CustomSnackbar
				open={errorInfo.isError}
				status="error"
				message={errorInfo.errorMessage}
			/>

			<Formik
				initialValues={{
					firstName: "",
					lastName: "",
					email: "",
					password: "",
					dob: "",
					gender: "",
					role: "",
				}}
				validationSchema={Yup.object({
					firstName: Yup.string()
						.min(2, "Must be at least 2 characters")
						.max(55, "Must be less than 55 characters")
						.trim()
						.required("First name is required"),
					lastName: Yup.string()
						.min(2, "Must be at least 2 characters")
						.max(55, "Must be 20 characters or less")
						.trim()
						.required("Last name is required"),
					email: Yup.string()
						.min(5, "Must be at lease 5 character")
						.max(55, "Must be 55 character")
						.trim()
						.email("Invalid email address")
						.required("Email is required"),
					password: Yup.string()
						.matches(
							/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
							"Passwords must be at least 8 characters long and contain at least one capital letter, one number, and one special character."
						)
						.max(25, "Must be 25 characters or less")
						.trim()
						.required("Password is required"),
					dob: Yup.date("Must be valid date").required(
						"Date of birth is required"
					),
					gender: Yup.string()
						.trim()
						.oneOf(["male", "female", "preferNotToSay", "Choose gender"])
						.required("Please choose gender"),
					role: Yup.string()
						.required("Choose role")
						.trim()
						.oneOf(["buyer", "seller", "Choose gender"]),
				})}
				onSubmit={async (values) => {
					setLoading(true);
					console.log(values);
					// api hit
					try {
						const response = await $axios.post("/user/register", values);
						console.log(response);

						setLoading(false);

						// set register success to true
						// setRegisterInfo({
						// 	open: true,
						// 	message: response?.data?.message,
						// 	status: "",
						// });

						// route to login
						navigate("/login");
					} catch (error) {
						setErrorInfo({
							isError: true,
							errorMessage: error.response.data.message,
						});
						// console.log(error.response.data);
						setLoading(false);
					}
				}}
			>
				{(formik) => (
					<form onSubmit={formik.handleSubmit} className="form-card">
						<h2 className="title">Register</h2>

						{/* First Name and Last Name */}
						<Box sx={{ display: "flex", gap: "1rem" }}>
							<div>
								<TextField
									className="w-100"
									name="firstName"
									label="First name"
									{...formik.getFieldProps("firstName")}
								/>
								{formik.touched.firstName && formik.errors.firstName ? (
									<div className="error-message">
										{formik.errors.firstName}
									</div>
								) : null}
							</div>
							<div>
								<TextField
									className="w-100"
									name="lastName"
									label="Last name"
									{...formik.getFieldProps("lastName")}
								/>
								{formik.touched.lastName && formik.errors.lastName ? (
									<div className="error-message">
										{formik.errors.lastName}
									</div>
								) : null}
							</div>
						</Box>

						{/* Email */}
						<div>
							<TextField
								className="w-100"
								name="email"
								label="Email"
								{...formik.getFieldProps("email")}
							/>
							{formik.touched.email && formik.errors.email ? (
								<div className="error-message">
									{formik.errors.email}
								</div>
							) : null}
						</div>

						{/* Gender and Role */}
						<Box sx={{ display: "flex", gap: "1rem" }}>
							<div>
								<FormControl sx={{ m: 0, minWidth: 190 }}>
									<InputLabel>Gender</InputLabel>
									<Select
										name="gender"
										label="Gender"
										{...formik.getFieldProps("gender")}
									>
										<MenuItem value="male">Male</MenuItem>
										<MenuItem value="female">Female</MenuItem>
										<MenuItem value="preferNotToSay">
											Prefer not to say
										</MenuItem>
									</Select>
									{formik.touched.gender && formik.errors.gender ? (
										<div className="error-message">
											{formik.errors.gender}
										</div>
									) : null}
								</FormControl>
							</div>
							<div>
								<FormControl sx={{ m: 0, minWidth: 190 }}>
									<InputLabel>Role</InputLabel>
									<Select
										name="role"
										label="Role"
										{...formik.getFieldProps("role")}
									>
										<MenuItem value="buyer">Buyer</MenuItem>
										<MenuItem value="seller">Seller</MenuItem>
									</Select>
									{formik.touched.role && formik.errors.role ? (
										<div className="error-message">
											{formik.errors.role}
										</div>
									) : null}
								</FormControl>
							</div>
						</Box>

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

						<div>
							<TextField
								className="w-100"
								name="dob"
								label="DOB"
								{...formik.getFieldProps("dob")}
							/>
							{formik.touched.dob && formik.errors.dob ? (
								<div className="error-message">{formik.errors.dob}</div>
							) : null}
							{/* <LocalizationProvider
								name="dob"
								{...formik.getFieldProps("dob")}
								dateAdapter={AdapterDayjs}
							>
								<DemoContainer components={["DatePicker"]}>
									<DatePicker label="Date Of Birth" name="dob" />
								</DemoContainer>
								{formik.touched.dob && formik.errors.dob ? (
									<div className="error-message">
										{formik.errors.dob}
									</div>
								) : null}
							</LocalizationProvider> */}
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
							Register
						</Button>
						<Divider />
						<Link to="/login">
							<Typography>Already have an account?</Typography>
						</Link>
					</form>
				)}
			</Formik>
		</div>
	);
};
