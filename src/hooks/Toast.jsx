import { BadgeAlert, BadgeCheck, Loader } from "lucide-react";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";

// eslint-disable-next-line react/prop-types
const Toast = ({ type, message, onHide }) => {
	const toastClasses = {
		success: "border-2 border-[#2d5e2e] text-[#98bc62]",
		error: "border-2 border-red-400 text-red-400",
		loading: "border-2 border-[#a16c46] text-[#fab07a]",
	};

	let iconComponent;

	switch (type) {
		case "success":
			iconComponent = <BadgeCheck />;
			break;
		case "error":
			iconComponent = <BadgeAlert />;
			break;
		case "loading":
			iconComponent = <Loader className="animate-spin" />;
			break;
		default:
			iconComponent = null;
	}

	// useEffect(() => {
	// 	const timeoutId = setTimeout(onHide, 3000);
	// 	return () => clearTimeout(timeoutId);
	// }, [onHide]);
	useEffect(() => {
		// Check if the type is "success" or "error" before setting a timeout
		if (type === "success" || type === "error") {
			const timeoutId = setTimeout(onHide, 3000);
			return () => clearTimeout(timeoutId);
		}

		// If the type is "loading," don't clear the timeout
	}, [type, onHide]);

	return (
		<Fade
			className="fixed right-0 z-50 flex justify-center w-full text-lg transform -translate-x-1/2 top-5"
			style={{ zIndex: "999999" }}
			direction="down"
		>
			<div
				className={` bg-white  font-semibold rounded-md shadow-md drop-shadow-md ${toastClasses[type]}`}
			>
				<p className="flex flex-row items-center justify-center px-4 py-4 font-semibold gap-x-4">
					{iconComponent}
					{message}
				</p>
			</div>
		</Fade>
	);
};

export default Toast;
