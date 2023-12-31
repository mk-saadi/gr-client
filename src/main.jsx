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
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
);
