import axios from "axios";
import { ArrowLeftFromLine, Eraser, Pencil, User } from "lucide-react";
import { useEffect, useState, Fragment } from "react";
import { Fade } from "react-awesome-reveal";
import { Link, useNavigate, useParams } from "react-router-dom";
import Toast from "../hooks/Toast";
import useToast from "../hooks/useToast";
import { Dialog, Transition } from "@headlessui/react";

const UserDetail = () => {
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

	// >> modal functions
	const [isOpen, setIsOpen] = useState(false);
	const [userIdToDelete, setUserIdToDelete] = useState(null);
	function closeModal() {
		setIsOpen(false);
	}
	function openModal(userId) {
		setUserIdToDelete(userId);
		setIsOpen(true);
	}

	const handleDelete = async (id) => {
		showToast("loading", "Please wait!");

		try {
			const res = await axios.delete(
				`http://localhost:2500/addedUsers/${id}`
			);
			if (res.data.deletedCount > 0) {
				setIsOpen(false);
				showToast("success", "successfully deleted user");

				setTimeout(() => {
					showToast("loading", "Redirecting");
					setTimeout(() => {
						navigate("/");
					}, 500);
				}, 1000);
			}
		} catch (error) {
			showToast("error", "Couldn't delete user, please try again!");
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
			<div className="flex flex-col items-center justify-center h-screen mx-auto max-w-prose">
				<div className="flex items-center justify-center gap-x-3">
					<Fade
						triggerOnce
						damping={1}
					>
						<div className="flex flex-col items-center justify-center px-4 py-2 border shadow-md md:flex-row bg-gray-200/70 border-yellow-900/20">
							<div className="pr-4">
								<User className="w-20 h-20 text-gray-700" />
							</div>
							<div className="flex flex-col">
								<p className="text-lg font-semibold text-gray-700">
									User name: {user.name}
								</p>
								<p>User email: {user.email}</p>
								<p>User phone number: {user.phone}</p>
								<p>Added by: {user.addedBy}</p>
							</div>
						</div>
					</Fade>

					<Fade>
						<div className="flex flex-col h-full gap-2 p-1 border border-yellow-900/20">
							<Link to={`/editUser/${user._id}`}>
								<label
									htmlFor="editUser"
									className="sr-only"
								>
									Edit user?
								</label>
								<button
									id="editUser"
									className="submitButton"
									title="edit user info?"
								>
									<Pencil />
								</button>
							</Link>

							<div>
								<label
									htmlFor="deleteUser"
									className="sr-only"
								>
									Delete user?
								</label>
								<button
									id="deleteUser"
									className="h-full logOutButton"
									title="delete user?"
									onClick={() => openModal(user._id)}
								>
									<Eraser />
								</button>
							</div>
							<Link to="/">
								<button
									type="button"
									className="goBack"
								>
									<ArrowLeftFromLine />
								</button>
							</Link>
						</div>
					</Fade>
				</div>

				{/* modal below */}
				<Transition
					appear
					show={isOpen}
					as={Fragment}
				>
					<Dialog
						as="div"
						className="relative"
						style={{ zIndex: "99" }}
						onClose={closeModal}
					>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-gray-950/25" />
						</Transition.Child>
						<div className="fixed inset-0 overflow-y-auto">
							<div className="flex items-center justify-center min-h-full p-4 text-center">
								<Transition.Child
									as={Fragment}
									enter="ease-out duration-300"
									enterFrom="opacity-0 scale-95"
									enterTo="opacity-100 scale-100"
									leave="ease-in duration-200"
									leaveFrom="opacity-100 scale-100"
									leaveTo="opacity-0 scale-95"
								>
									<Dialog.Panel className="w-full max-w-xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white rounded-none">
										<Fade
											triggerOnce
											damping={1}
										>
											<Dialog.Title
												as="h2"
												className="text-xl font-semibold leading-6 text-center text-gray-700"
											>
												Are you sure you want to delete
												this user?
											</Dialog.Title>
										</Fade>

										<Fade
											triggerOnce
											damping={1}
											className="flex items-center justify-center"
										>
											<div className="mt-3 text-xs text-center text-gray-500 md:text-sm max-w-prose">
												<p>
													Once you delete this user
													he/she will be permanently
													deleted.
													<br />
													Proceed with caution.
												</p>
											</div>
										</Fade>

										<div className="flex justify-between mt-8 gap-x-14">
											<button
												type="button"
												className="goBack"
												onClick={closeModal}
											>
												Go back
											</button>

											<button
												className="logOutButton"
												onClick={() =>
													handleDelete(userIdToDelete)
												}
											>
												Delete
											</button>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</Dialog>
				</Transition>
			</div>
		</>
	);
};

export default UserDetail;
