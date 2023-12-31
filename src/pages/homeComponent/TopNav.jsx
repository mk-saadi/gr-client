import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TopNav = ({ logOut }) => {
	const navigate = useNavigate();

	const handleLogOut = () => {
		logOut();
		localStorage.removeItem("access-token-gurukul");

		window.location.reload();

		navigate("/login");
	};

	return (
		<div>
			<div className="flex items-center justify-between px-4 py-1 mx-8 border-b border-orange-900/20">
				<div className="pointer-events-none select-none">
					<h1 className="text-[#f7cf31] text-3xl text-center font-semibold drop-shadow-md">
						KHALED
					</h1>
				</div>

				<div>
					<button
						onClick={handleLogOut}
						className="flex items-center justify-center gap-x-2 submitButton"
					>
						Sign out <LogOut />
					</button>
				</div>
			</div>
		</div>
	);
};

export default TopNav;
