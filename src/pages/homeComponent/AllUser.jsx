import { Eraser, Loader, Pencil, User, UserX } from "lucide-react";
import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fade } from "react-awesome-reveal";
import axios from "axios";
import useToast from "../../hooks/useToast";
import Toast from "../../hooks/Toast";
import { Link } from "react-router-dom";

const AllUser = () => {
	const { toastType, toastMessage, showToast, hideToast } = useToast();
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			try {
				const res = await axios.get("http://localhost:2500/addedUsers");
				if (res) {
					setUsers(res.data);
					setLoading(false);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

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
				setUsers((prevUsers) =>
					prevUsers.filter((user) => user._id !== id)
				);
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

			{loading ? (
				<div className="h-[80vh]">
					<div className="flex flex-col items-center justify-center overflow-y-hidden text-[#a16c46]">
						<Loader className="w-20 h-20 animate-spin" />
						<p className="text-xl font-semibold">Loading...</p>
					</div>
				</div>
			) : users.length === 0 ? (
				<div className="flex items-center justify-center h-full px-4 py-2 mx-auto border max-w-prose bg-gray-200/70 border-yellow-900/20">
					<div className="flex flex-col items-center justify-center">
						<div>
							<UserX className="w-20 h-20 text-gray-700" />
						</div>
						<p className="text-lg font-semibold leading-6 text-gray-700">
							looks like there are no users.
						</p>
						<p>
							<small className="font-medium leading-5 text-gray-500 truncate">
								Click on the floating button below to add new
								user to database.
							</small>
						</p>
					</div>
				</div>
			) : (
				<div className="mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
					<Fade
						damping={0.3}
						cascade
						role="list"
						className="py-2 mx-3 space-y-2 divide-y divide-gray-100 md:mx-0"
					>
						{users.map((person) => (
							<li
								key={person._id}
								className="flex justify-between px-4 pt-2 my-1 duration-200 bg-gray-200/70 gap-x-6 hover:bg-gray-300/70"
							>
								<div className="flex justify-between w-full pb-2 border-b border-yellow-900/20">
									<div className="flex min-w-0 gap-x-4">
										<div className="flex-auto min-w-0">
											<div className="flex items-center justify-start gap-3">
												<Link
													to={`/userDetail/${person._id}`}
												>
													<User className="w-10 h-10 text-gray-700" />
												</Link>
												<div>
													<Link
														to={`/userDetail/${person._id}`}
													>
														<p className="text-sm font-semibold leading-6 text-gray-700 hover:underline">
															{person.name}
														</p>
													</Link>

													<p className="text-xs font-medium leading-5 text-gray-500 truncate">
														{person.email}
													</p>
													<p className="text-xs font-medium leading-5 text-gray-500 truncate">
														Phone: {person.phone}
													</p>
												</div>
											</div>
										</div>
									</div>
									<div className="flex flex-col items-end">
										<p className="hidden text-sm font-semibold leading-6 text-gray-700 md:block">
											Added by:{" "}
											<span className="text-gray-500">
												{person?.addedBy}
											</span>
										</p>

										<div className="flex flex-col gap-4 md:flex-row ">
											<Link
												to={`/editUser/${person._id}`}
											>
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
											<div className="z-10">
												<label
													htmlFor="deleteUser"
													className="sr-only"
												>
													Delete user?
												</label>
												<button
													id="deleteUser"
													className="logOutButton"
													title="delete user?"
													// onClick={openModal}
													onClick={() =>
														openModal(person._id)
													}
												>
													<Eraser />
												</button>
											</div>
										</div>
									</div>
								</div>
							</li>
						))}
					</Fade>

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
													Are you sure you want to
													delete this user?
												</Dialog.Title>
											</Fade>

											<Fade
												triggerOnce
												damping={1}
												className="flex items-center justify-center"
											>
												<div className="mt-3 text-xs text-center text-gray-500 md:text-sm max-w-prose">
													<p>
														Once you delete this
														user he/she will be
														permanently deleted.
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
														handleDelete(
															userIdToDelete
														)
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
			)}

			{/* {users.length === 0 ? (
				<div className="flex items-center justify-center h-full px-4 py-2 mx-auto border max-w-prose bg-gray-200/70 border-yellow-900/20">
					<div className="flex flex-col items-center justify-center">
						<div>
							<UserX className="w-20 h-20 text-gray-700" />
						</div>
						<p className="text-lg font-semibold leading-6 text-gray-700">
							looks like there are no users.
						</p>
						<p>
							<small className="font-medium leading-5 text-gray-500 truncate">
								Click on the floating button below to add new
								user to database.
							</small>
						</p>
					</div>
				</div>
			) : (
				<div className="mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
					<Fade
						damping={0.3}
						cascade
						role="list"
						className="py-2 mx-3 space-y-2 divide-y divide-gray-100 md:mx-0"
					>
						{users.map((person) => (
							<li
								key={person._id}
								className="flex justify-between px-4 pt-2 my-1 duration-200 bg-gray-200/70 gap-x-6 hover:bg-gray-300/70"
							>
								<div className="flex justify-between w-full pb-2 border-b border-yellow-900/20">
									<div className="flex min-w-0 gap-x-4">
										<div className="flex-auto min-w-0">
											<div className="flex items-center justify-start gap-3">
												<Link
													to={`/userDetail/${person._id}`}
												>
													<User className="w-10 h-10 text-gray-700" />
												</Link>
												<div>
													<Link
														to={`/userDetail/${person._id}`}
													>
														<p className="text-sm font-semibold leading-6 text-gray-700 hover:underline">
															{person.name}
														</p>
													</Link>

													<p className="text-xs font-medium leading-5 text-gray-500 truncate">
														{person.email}
													</p>
													<p className="text-xs font-medium leading-5 text-gray-500 truncate">
														Phone: {person.phone}
													</p>
												</div>
											</div>
										</div>
									</div>
									<div className="flex flex-col items-end">
										<p className="hidden text-sm font-semibold leading-6 text-gray-700 md:block">
											Added by:{" "}
											<span className="text-gray-500">
												{person?.addedBy}
											</span>
										</p>

										<div className="flex flex-col gap-4 md:flex-row ">
											<Link
												to={`/editUser/${person._id}`}
											>
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
											<div className="z-10">
												<label
													htmlFor="deleteUser"
													className="sr-only"
												>
													Delete user?
												</label>
												<button
													id="deleteUser"
													className="logOutButton"
													title="delete user?"
													// onClick={openModal}
													onClick={() =>
														openModal(person._id)
													}
												>
													<Eraser />
												</button>
											</div>
										</div>
									</div>
								</div>
							</li>
						))}
					</Fade>

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
													Are you sure you want to
													delete this user?
												</Dialog.Title>
											</Fade>

											<Fade
												triggerOnce
												damping={1}
												className="flex items-center justify-center"
											>
												<div className="mt-3 text-xs text-center text-gray-500 md:text-sm max-w-prose">
													<p>
														Once you delete this
														user he/she will be
														permanently deleted.
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
														handleDelete(
															userIdToDelete
														)
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
			)} */}
		</>
	);
};

export default AllUser;
