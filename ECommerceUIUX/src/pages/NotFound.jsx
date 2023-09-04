/* eslint-disable react/no-unescaped-entities */
import React from "react";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const NotFound = () => {
	return (
		<div className="form-container">
			<div className="form-card text-center">
				<ErrorTwoToneIcon sx={{ fontSize: "4.5rem", margin: "0 auto" }} />
				Oops! Product Not found Sorry!
				<Link to="/product/add">
					Let's add product <br />
					<Button variant="outlined" sx={{ marginTop: "1.5rem" }}>
						Add Product
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
