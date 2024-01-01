import axios from "axios";
import { ArrowLeftFromLine, Eraser, Pencil, User } from "lucide-react";
import { useEffect, useState, Fragment } from "react";
import { Fade } from "react-awesome-reveal";
import { Link, useNavigate, useParams } from "react-router-dom";
import useToast from "../../hooks/useToast";
import Toast from "../../hooks/Toast";

const EditUser = () => {
	const { toastType, toastMessage, showToast, hideToast } = useToast();
	const [user, setUser] = useState([]);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(
					`http://localhost:2500/addedUsers/${id}`
				);
				if (res) {
					setUser(res.data);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [id]);

	const handleEdit = async (event) => {
		event.preventDefault();

		const form = event.target;
		const name = form.name.value;
		const email = form.email.value;
		const phone = form.phone.value;

		const uUser = {
			name: name,
			email: email,
			phone: phone,
		};

		try {
			const response = await axios.put(
				`http://localhost:2500/addedUsers/${id}`,
				uUser
			);

			if (response.data.acknowledged === true) {
				showToast("success", "Successfully updated!");

				setTimeout(() => {
					showToast("loading", "Redirecting");
					setTimeout(() => {
						navigate("/");
					}, 500);
				}, 1000);
			}
		} catch (error) {
			showToast("error", "Update unsuccessful!");
		}
	};

	return (
		<>
			{toastType && (
				<Toast
					type={toastType}
					message={toastMessage}
					onHide={hideToast}
				/>
			)}

			<div className="flex items-center justify-center h-screen">
				<Fade
					damping={1}
					triggerOnce
					className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm"
				>
					<form
						method="POST"
						onSubmit={handleEdit}
						className="space-y-2 md:space-y-4"
					>
						<div>
							<label
								htmlFor="name"
								className="block text-xs font-medium leading-6 text-gray-900 md:text-sm"
							>
								User Name
							</label>
							<div className="mt-2">
								<input
									id="name"
									name="name"
									type="text"
									autoComplete="name"
									required
									className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none px-2 font-semibold"
									defaultValue={user.name}
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-xs font-medium leading-6 text-gray-900 md:text-sm"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none px-2 font-semibold"
									defaultValue={user.email}
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="phone"
								className="block text-xs font-medium leading-6 text-gray-900 md:text-sm"
							>
								Phone number
							</label>
							<div className="mt-2">
								<input
									id="phone"
									name="phone"
									type="number"
									autoComplete="phone"
									required
									className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none px-2 font-semibold"
									defaultValue={user.phone}
								/>
							</div>
						</div>

						<div className="flex justify-between mt-4 gap-x-14">
							<Link
								className="goBack"
								to="/"
							>
								Go back
							</Link>

							<input
								type="submit"
								className="submitButton"
								value="Update user!"
							/>
						</div>
					</form>
				</Fade>
			</div>
		</>
	);
};

export default EditUser;
