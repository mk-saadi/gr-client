import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AddUser from "./homeComponent/AddUser";
import { AuthContext } from "../provider/AuthProvider";
import TopNav from "./homeComponent/TopNav";
import AllUser from "./homeComponent/AllUser";

const Home = () => {
	const { user, logOut } = useContext(AuthContext);

	return (
		<div className="relative min-h-screen">
			<div>
				<div>
					<TopNav logOut={logOut} />
				</div>

				<div className="mt-8">
					<div>
						<AllUser />
					</div>
				</div>
			</div>

			<div className="fixed z-50 bottom-4 right-4">
				<AddUser user={user} />
			</div>
		</div>
	);
};

export default Home;
