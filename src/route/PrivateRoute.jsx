/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
// import { AuthContext } from "../provider/AuthProvider";

const PrivateRoute = ({ children }) => {
	// const { user } = useContext(AuthContext);
	const [loading, setLoading] = useState(true);
	const accessToken = localStorage.getItem("access-token-gurukul");
	const location = useLocation();

	useEffect(() => {
		setLoading(false);
	}, []);

	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center h-screen">
				<span className="w-32 h-32 loading loading-spinner"></span>
				<p className="text-5xl">Please wait...</p>
			</div>
		);
	}

	if (!accessToken) {
		return (
			<Navigate
				state={{ from: location }}
				to="/login"
				replace
			></Navigate>
		);
	}

	return children;
};

export default PrivateRoute;
