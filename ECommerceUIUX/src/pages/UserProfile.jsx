import React, { useEffect } from "react";
import "../App.css";
import { Typography } from "@mui/material";
import { $axios } from "../lib/axios";

const UserProfile = () => {
	const userDetail = localStorage.getItem("accesstoken");
	console.log(userDetail.user);

	const getUserDetail = async () => {
		try {
			const response = await $axios.get(`user/login`);
			console.log(response.user);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		getUserDetail();
	}, []);

	return (
		<>
			<div className="form-container">
				<div
					className="form-card"
					style={{
						width: "35rem",
						background: "#fff",
						borderRadius: "8px",
						boxShadow: "300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
					}}
				>
					<div className="space-between">
						<div>
							<img
								className="user-profile-img"
								src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2550&q=80"
								alt=""
							/>
						</div>
						<div className="user-info-section">
							<Typography>Name: </Typography>
							<Typography>Email: </Typography>
							<Typography>Gender: </Typography>
							<Typography>Role: </Typography>
							<Typography>Date Of Birth: </Typography>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserProfile;
