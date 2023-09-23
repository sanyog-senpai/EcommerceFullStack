/* eslint-disable react/prop-types */
import {
	FormControl,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from "@mui/material";
import React from "react";

const AmountInput = (props) => {
	return (
		<div>
			<FormControl sx={{ m: 1, maxWidth: "8.9rem" }}>
				<InputLabel htmlFor="outlined-adornment-amount">
					{props.label}
				</InputLabel>
				<OutlinedInput
					type="number"
					id="outlined-adornment-amount"
					startAdornment={
						<InputAdornment position="start">Rs</InputAdornment>
					}
					label={props.label}
				/>
			</FormControl>
		</div>
	);
};

export default AmountInput;
