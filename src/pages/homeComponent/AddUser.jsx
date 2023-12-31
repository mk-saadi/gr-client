import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BadgePlus } from "lucide-react";
import { Fade } from "react-awesome-reveal";
import axios from "axios";

const AddUser = ({ user }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	function closeModal() {
		setIsOpen(false);
		setError("");
		setSuccess("");
	}

	function openModal() {
		setIsOpen(true);
	}

	const handleUser = async (e) => {
		e.preventDefault();

		const form = e.target;
		const name = form.name.value;
		const email = form.email.value;
		const phone = form.phone.value;

		const userDocument = {
			name,
			email,
			phone,
		};

		try {
			const response = await axios.post(
				"http://localhost:2500/addedUserss",
				userDocument
			);
			if (response.data.acknowledged === true) {
				setSuccess("User successfully added to database!");
				form.reset();
			}
		} catch (error) {
			setError("Couldn't add user to database!");
		}
	};

	return (
		<>
			<div className="">
				<div>
					<button
						title="add new user"
						onClick={openModal}
						className="submitButton"
					>
						<BadgePlus />
					</button>
				</div>
			</div>

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
											Add new user?
										</Dialog.Title>
									</Fade>

									<Fade
										triggerOnce
										damping={1}
										className="flex items-center justify-center"
									>
										<div className="mt-3 text-sm text-gray-500 max-w-prose">
											<p>
												Enter the required information's
												below to add new user to
												database.
											</p>
										</div>
									</Fade>

									<Fade
										damping={1}
										triggerOnce
										className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm"
									>
										<form
											method="POST"
											onSubmit={handleUser}
											className="space-y-4"
										>
											<div>
												<label
													htmlFor="name"
													className="block text-sm font-medium leading-6 text-gray-900"
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
													/>
												</div>
											</div>
											<div>
												<label
													htmlFor="email"
													className="block text-sm font-medium leading-6 text-gray-900"
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
													/>
												</div>
											</div>

											<div>
												<label
													htmlFor="phone"
													className="block text-sm font-medium leading-6 text-gray-900"
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
													/>
												</div>
											</div>

											<Fade damping={1}>
												<p className="flex items-center justify-center text-sm font-medium text-red-400">
													{error}
												</p>
												<p className="flex items-center justify-center text-sm font-medium text-green-400">
													{success}
												</p>
											</Fade>

											<div className="flex justify-between mt-4 gap-x-14">
												<button
													type="button"
													className="w-full font-semibold text-gray-700 duration-200 bg-gray-200 rounded-none goBack"
													onClick={closeModal}
												>
													Go back
												</button>

												<input
													type="submit"
													className="submitButton"
													value="Add user!"
												/>
											</div>
										</form>
									</Fade>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default AddUser;
