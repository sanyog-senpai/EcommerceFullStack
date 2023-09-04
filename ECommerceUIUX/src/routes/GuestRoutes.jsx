import { Login } from "../pages/Login/Login.jsx";
import { Register } from "../pages/Register/Register.jsx";

const guestRoutes = [
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
];

export default guestRoutes;