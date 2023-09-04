import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import Home from "../pages/Home/Home";
import BuyerProduct from "../pages/Product/BuyerProduct";
import SellerProduct from "../pages/Product/SellerProduct";
import ProductCard from "../pages/Product/ProductCard";
import { ProductForm } from "../pages/Product/ProductForm";
import Product from "../pages/Product/Product";
import ProductDetail from "../pages/Product/ProductDetail";
import UserProfile from "../pages/UserProfile";

const userRole = localStorage.getItem("userRole");
// console.log(userRole);

const loginRoutes = [
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				path: "",
				element: <Home />,
			},
			{
				path: "about",
				element: <About />,
			},
			{
				path: "products",
				element: <Product />,
			},
			{
				path: "product/add",
				element: <ProductForm />,
			},
			{
				path: "product-card",
				element: <ProductCard />,
			},
			{
				path: "product/details/:id",
				element: <ProductDetail />,
			},
			{
				path: "user-details",
				element: <UserProfile />,
			},
		],
	},
];

export default loginRoutes;
