import MinimumLayout from "../layout/MinimumLayout.jsx";
import { Login } from "../pages/Login/Login.jsx";
import { Register } from "../pages/Register/Register.jsx";
import Home from "../pages/Home/Home.jsx";

const guestRoutes = [
	{
		path: "/",
		element: <MinimumLayout />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
		],
	},
];

export default guestRoutes;
