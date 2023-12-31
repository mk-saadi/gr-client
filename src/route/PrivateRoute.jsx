/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

// const PrivateRoute = ({ children }) => {
// 	const { user, loading } = useContext(AuthContext);
// 	const location = useLocation();

// 	if (loading) {
// 		return (
// 			<div className="flex items-center justify-center h-screen">
// 				{/* <span className="w-32 h-32 loading loading-ring"></span> */}
// 				<p>loading...</p>
// 			</div>
// 		);
// 	}

// 	if (user) {
// 		return children;
// 	}

// 	return (
// 		<Navigate
// 			to="/login"
// 			state={{ from: location }}
// 			replace
// 		></Navigate>
// 	);
// };

// export default PrivateRoute;

const PrivateRoute = ({ children }) => {
	const [loading, setLoading] = useState(true); // Initialize the loading state variable to true
	const accessToken = localStorage.getItem("access-token-gurukul");
	console.log("accessToken: ", accessToken);
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
		// Redirect the user to the login page if their accessToken address does not exist
		return (
			<Navigate
				state={{ from: location }}
				to="/login"
				replace
			></Navigate>
		);
	}

	// Return the children component if the user is logged in
	return children;
};

export default PrivateRoute;
