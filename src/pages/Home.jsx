import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AddUser from "./homeComponent/AddUser";
import { AuthContext } from "../provider/AuthProvider";
import TopNav from "./homeComponent/TopNav";
import AllUser from "./homeComponent/AllUser";

const Home = () => {
	const [users, setUsers] = useState([]);
	const { user, logOut } = useContext(AuthContext);

	useEffect(() => {
		try {
			const res = axios.get("http://localhost:2500/addedUsers");
			if (res) {
				setUsers(res.data);
			}
		} catch (error) {
			console.log(error);
		}
	}, []);
	return (
		<div className="relative min-h-[200vh]">
			<div>
				<div>
					<TopNav logOut={logOut} />
				</div>

				{users && (
					<div>
						<AllUser users={users} />
					</div>
				)}
			</div>

			<div className="fixed bottom-4 right-4">
				<AddUser user={user} />
			</div>
		</div>
	);
};

export default Home;
