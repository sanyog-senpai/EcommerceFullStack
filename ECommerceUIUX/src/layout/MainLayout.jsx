import React from "react";
import NavigationBar from "../components/NavigationBar";
import { Outlet } from "react-router-dom";

import CustomFooter from "../components/CustomFooter";

const MainLayout = () => {
	return (
		<div>
			<NavigationBar />
			<Outlet />
			{/* <CustomFooter /> */}
		</div>
	);
};

export default MainLayout;
