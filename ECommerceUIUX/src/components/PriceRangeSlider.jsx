import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
	return `${value}°C`;
}

export default function PriceRangePicker() {
	const [value, setValue] = React.useState([1, 100000]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: 300 }}>
			<Slider
				getAriaLabel={() => "Filter Price SLider"}
				aria-label="Filter Price Slider"
				max={100000}
				min={1}
				step={1000}
				value={value}
				onChange={handleChange}
				valueLabelDisplay="auto"
				getAriaValueText={valuetext}
			/>
		</Box>
	);
}
