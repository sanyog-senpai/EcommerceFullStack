/* eslint-disable react/no-unescaped-entities */
import React from "react";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const NotFound = () => {
	const userRole = localStorage.getItem("userRole");
	return (
		<div className="form-container" style={{ height: "75vh" }}>
			<div className="form-card text-center">
				<ErrorTwoToneIcon sx={{ fontSize: "4.5rem", margin: "0 auto" }} />
				Oops! Product Not found Sorry!
				{userRole === "seller" && (
					<Link to="/product/add">
						Let's add product <br />
						<Button variant="outlined" sx={{ marginTop: "1.5rem" }}>
							Add Product
						</Button>
					</Link>
				)}
			</div>
		</div>
	);
};

export default NotFound;
