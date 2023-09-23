/* eslint-disable react/prop-types */
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "../store/slices/snackbarSlices";

const CustomSnackbar = () => {
	const snackbarData = useSelector((state) => state.snackbar);

	const dispatch = useDispatch();

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		// setOpen(false);
		dispatch(closeSnackbar());
	};

	return (
		<Snackbar
			open={snackbarData.open}
			autoHideDuration={6000}
			onClose={handleClose}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			sx={{ top: "5rem !important" }}
		>
			<Alert
				onClose={handleClose}
				severity={snackbarData.severity}
				sx={{ width: "100%" }}
			>
				{snackbarData.message}
			</Alert>
		</Snackbar>
	);
};

export default CustomSnackbar;
