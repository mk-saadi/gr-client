import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
// import Main from "./layout/Main";
import Login from "./auth/Login";
import Register from "./auth/Register";
import AuthProvider from "./provider/AuthProvider";
import PrivateRoute from "./route/PrivateRoute";
import Home from "./pages/Home";
import UserDetail from "./pages/UserDetail";
import EditUser from "./pages/homeComponent/EditUser";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<PrivateRoute>
				<Home />
			</PrivateRoute>
		),
	},
	{
		path: "/userDetail/:id",
		element: (
			<PrivateRoute>
				<UserDetail />
			</PrivateRoute>
		),
	},
	{
		path: "/editUser/:id",
		element: (
			<PrivateRoute>
				<EditUser />
			</PrivateRoute>
		),
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<div className="flex flex-col min-h-screen overflow-x-hidden">
				<RouterProvider router={router} />
			</div>
		</AuthProvider>
	</React.StrictMode>
);
