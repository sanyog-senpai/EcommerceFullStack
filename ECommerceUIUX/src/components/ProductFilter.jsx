import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AmountInput from "./AmountInput";
import FilterProductDropDown from "./FilterProductDropDown";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { Box, Typography } from "@mui/material";

export default function AlertDialog() {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button variant="outlined" onClick={handleClickOpen}>
				<TuneOutlinedIcon sx={{ marginRight: "0.5rem" }} />
				Filter
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<Box sx={{ padding: "3rem" }}>
					<Typography
						variant="h6"
						sx={{
							marginBottom: "1rem",
							marginLeft: "8px",
							fontWeight: "500",
							fontSize: "1.1rem",
						}}
					>
						Product Filter
					</Typography>
					<Box id="alert-dialog-description">
						<div className="flex">
							<AmountInput label="Min Price" />
							<AmountInput label="Max Price" />
						</div>
						<FilterProductDropDown className="w-100" />
					</Box>
					<DialogActions sx={{ marginTop: "0.8rem" }}>
						<Button
							onClick={handleClose}
							variant="contained"
							color="error"
						>
							Cancel 
						</Button>
						<Button
							onClick={handleClose}
							variant="contained"
							color="success"
							autoFocus
						>
							Filter
						</Button>
					</DialogActions>
				</Box>
			</Dialog>
		</>
	);
}
