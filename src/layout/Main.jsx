import { Outlet } from "react-router-dom";

const Main = () => {
	return (
		<div>
			<div className="h-screen flex flex-col overflow-x-hidden">
				<Outlet />
			</div>
		</div>
	);
};

export default Main;
