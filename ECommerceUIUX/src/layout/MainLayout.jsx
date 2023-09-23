import React from "react";
import NavigationBar from "../components/NavigationBar";
import { Outlet } from "react-router-dom";

import CustomFooter from "../components/CustomFooter";
import CustomSnackbar from "../components/CustomSnackbar";

const MainLayout = () => {
	return (
		<div>
			<NavigationBar />
			<Outlet />
			<CustomSnackbar />
			{/* <CustomFooter /> */}
		</div>
	);
};

export default MainLayout;
