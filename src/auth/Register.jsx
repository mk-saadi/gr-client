import { Fragment, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import {
	Check,
	CheckIcon,
	ChevronsUpDown,
	ChevronsUpDownIcon,
} from "lucide-react";
import { Fade } from "react-awesome-reveal";
import Toast from "../hooks/Toast";
import useToast from "../hooks/useToast";
import { Listbox, RadioGroup, Transition, Combobox } from "@headlessui/react";

const gender = [{ name: "Male" }, { name: "Female" }, { name: "Other" }];

const city = [
	{ ci: "Mumbai" },
	{ ci: "Pune" },
	{ ci: "Ahmedabad" },
	{ ci: "Kolkata" },
	{ ci: "Delhi" },
	{ ci: "Hyderabad" },
	{ ci: "Surat" },
	{ ci: "Bangalore" },
	{ ci: "Kanpur" },
	{ ci: "Lucknow" },
	{ ci: "Chennai" },
	{ ci: "Jaipur" },
];

const state = [
	{ id: 1, name: "Gujarat" },
	{ id: 2, name: "Maharashtra" },
	{ id: 3, name: "Karnataka" },
	{ id: 5, name: "Uttar Pradesh" },
	{ id: 7, name: "Rajasthan" },
	{ id: 8, name: "Andhra Pradesh" },
	{ id: 9, name: "Odisha" },
	{ id: 10, name: "Tamil Nadu" },
	{ id: 11, name: "Telangana" },
	{ id: 12, name: "West Bengal" },
	{ id: 13, name: "Arunachal Pradesh" },
	{ id: 14, name: "Assam" },
	{ id: 15, name: "Himachal Pradesh" },
	{ id: 16, name: "Haryana" },
	{ id: 17, name: "Punjab" },
	{ id: 18, name: "Meghalaya" },
	{ id: 19, name: "Manipur" },
	{ id: 20, name: "Mizoram" },
	{ id: 21, name: "Sikkim" },
	{ id: 22, name: "Goa" },
	{ id: 23, name: "Chhattisgarh" },
	{ id: 24, name: "Bihar" },
];

const Register = () => {
	const { toastType, toastMessage, showToast, hideToast } = useToast();
	const { signUp, updateProfileInfo } = useContext(AuthContext);
	const navigate = useNavigate();

	const [selected, setSelected] = useState(gender[0]);
	const [selectedCity, setSelectedCity] = useState(city[0]);
	const [selectedState, setSelectedState] = useState(state[0]);

	const [query, setQuery] = useState("");
	const filteredState =
		query === ""
			? state
			: state.filter((st) =>
					st.name
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.toLowerCase().replace(/\s+/g, ""))
			  );

	const handleSignUp = async (event) => {
		showToast("loading", "Pleases Wait!");
		event.preventDefault();

		const form = event.target;
		const name = form.name.value;
		const email = form.email.value;
		const phone = form.phone.value;
		const password = form.password.value;
		const gender = selected.name;
		const city = selectedCity.ci;
		const state = selectedState.name;
		const checkedCheckboxes = form.querySelectorAll(
			'#hearAboutUs input[type="checkbox"]:checked'
		);
		const hearAboutUsValues = Array.from(checkedCheckboxes).map(
			(checkbox) => checkbox.name
		);

		if (password.length < 6) {
			return showToast(
				"error",
				"Password must be at least 6 characters!"
			);
		}

		const userDocument = {
			name,
			email,
			password,
			hearAboutUsValues,
			gender,
			city,
			state,
			phone,
		};

		try {
			const res = await signUp(email, password);
			updateProfileInfo(name);
			if (res.user) {
				try {
					const response = await axios.post(
						"http://localhost:2500/users",
						userDocument
					);
					if (response.data.acknowledged === true) {
						showToast("success", "Registration successful!");
						form.reset();

						setTimeout(() => {
							showToast("loading", "Redirecting");
							setTimeout(() => {
								navigate("/");
							}, 500);
						}, 1000);
					}
				} catch (error) {
					showToast("error", "Couldn't store data to database!");
				}
			}
		} catch (error) {
			showToast("error", "Error singing in user!");
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
			<div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 md:px-0">
				<div className="h-full sm:mx-auto sm:w-full sm:max-w-sm">
					<Fade
						triggerOnce
						className="text-[#f7cf31] text-3xl text-center font-semibold"
					>
						KHALED
					</Fade>
					<Fade
						triggerOnce
						className="mt-4 text-xl font-bold leading-9 tracking-tight text-center text-gray-900"
					>
						Create a new account
					</Fade>
				</div>

				<div className="">
					<Fade
						damping={1}
						triggerOnce
						className=" sm:mx-auto sm:w-full sm:max-w-sm"
					>
						<form
							className="space-y-6"
							onSubmit={handleSignUp}
							method="POST"
						>
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Your Name
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

							{/* gender*/}
							<div className="w-full">
								<label
									htmlFor="CityCat"
									className="block text-sm font-semibold leading-6 text-gray-900"
								>
									Select your gender.
								</label>
								<div className="w-full max-w-md mx-auto mt-2">
									<RadioGroup
										value={selected}
										onChange={setSelected}
									>
										<RadioGroup.Label className="sr-only">
											Server size
										</RadioGroup.Label>
										<div className="flex justify-start w-full space-x-2">
											{gender.map((plan) => (
												<RadioGroup.Option
													key={plan.name}
													value={plan}
													className={({
														active,
														checked,
													}) =>
														`${
															active
																? "//you can use /ring/ for the selected//"
																: ""
														}
                                                            ${
																checked
																	? "bg-gradient-to-b from-[#f7cf31] to-[#c59e00] text-white"
																	: "bg-white"
															}
                                                                relative flex cursor-pointer rounded-none px-5 py-1 shadow-md focus:outline-none  ring-1 ring-[#645104]`
													}
												>
													{({ checked }) => (
														<>
															<div className="flex items-center justify-between w-full">
																<div className="flex items-center">
																	<div className="text-sm">
																		<RadioGroup.Label
																			as="p"
																			className={`font-medium  ${
																				checked
																					? "text-[#645104] font-semibold"
																					: "text-gray-700 font-semibold"
																			}`}
																		>
																			{
																				plan.name
																			}
																		</RadioGroup.Label>
																	</div>
																</div>
															</div>
														</>
													)}
												</RadioGroup.Option>
											))}
										</div>
									</RadioGroup>
								</div>
							</div>

							{/* City here */}
							<Listbox
								value={selectedCity}
								onChange={setSelectedCity}
								required
								name="CityCat"
							>
								<div className="relative w-full mt-1">
									<label
										htmlFor="CityCat"
										className="block text-sm font-semibold leading-6 text-gray-900"
									>
										Select City.
									</label>
									<Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-none cursor-default focus:outline-none focus-visible:border-[#645104] focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-[#645104] sm:text-sm ring-1 ring-inset ring-[#645104] mt-2">
										<span className="block truncate">
											{selectedCity.ci}
										</span>
										<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
											<ChevronsUpDown
												className="w-5 h-5 text-gray-400"
												aria-hidden="true"
											/>
										</span>
									</Listbox.Button>
									<Transition
										as={Fragment}
										leave="transition ease-in duration-100"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
											{city.map((City, CityIdx) => (
												<Listbox.Option
													key={CityIdx}
													className={({ active }) =>
														`relative select-none py-2 pl-10 pr-4 font-semibold cursor-pointer ${
															active
																? "bg-gradient-to-b from-[#f7cf31] to-[#c59e00] cursor-pointer duration-200 text-white font-bold"
																: "text-gray-700 font-semibold"
														}`
													}
													value={City}
												>
													{({ selected }) => (
														<>
															<span
																className={`block truncate ${
																	selected
																		? "font-medium"
																		: "font-normal"
																}`}
															>
																{City.ci}
															</span>
															{selected ? (
																<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
																	<Check
																		className="w-5 h-5"
																		aria-hidden="true"
																	/>
																</span>
															) : null}
														</>
													)}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</Transition>
								</div>
							</Listbox>

							<div>
								<Combobox
									value={selectedState}
									onChange={setSelectedState}
								>
									<label
										htmlFor="stateName"
										className="block text-sm font-semibold leading-6 text-gray-900"
									>
										Select State.
									</label>
									<div className="relative mt-2">
										<div className="relative w-full cursor-default overflow-hidden rounded-none bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 border border-[#645104] focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:text-sm">
											<Combobox.Input
												className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none focus:ring-0"
												displayValue={(state) =>
													state.name
												}
												onChange={(event) =>
													setQuery(event.target.value)
												}
											/>
											<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
												<ChevronsUpDownIcon
													className="w-5 h-5 text-gray-400"
													aria-hidden="true"
												/>
											</Combobox.Button>
										</div>
										<Transition
											as={Fragment}
											leave="transition ease-in duration-100"
											leaveFrom="opacity-100"
											leaveTo="opacity-0"
											afterLeave={() => setQuery("")}
										>
											<Combobox.Options
												className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm"
												style={{ zIndex: "999" }}
											>
												{filteredState.length === 0 &&
												query !== "" ? (
													<div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
														Nothing found.
													</div>
												) : (
													filteredState.map(
														(person) => (
															<Combobox.Option
																key={person.id}
																className={({
																	active,
																}) =>
																	`relative cursor-default select-none py-2 pl-10 pr-4  ${
																		active
																			? "bg-gradient-to-b from-[#f7cf31] to-[#c59e00] cursor-pointer duration-200 text-white font-bold"
																			: "text-gray-700 font-semibold"
																	}`
																}
																value={person}
															>
																{({
																	selected,
																	active,
																}) => (
																	<>
																		<span
																			className={`block truncate ${
																				selected
																					? "font-medium"
																					: "font-normal"
																			}`}
																		>
																			{
																				person.name
																			}
																		</span>
																		{selected ? (
																			<span
																				className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
																					active
																						? "text-white"
																						: "text-teal-600"
																				}`}
																			>
																				<CheckIcon
																					className="w-5 h-5"
																					aria-hidden="true"
																				/>
																			</span>
																		) : null}
																	</>
																)}
															</Combobox.Option>
														)
													)
												)}
											</Combobox.Options>
										</Transition>
									</div>
								</Combobox>
							</div>

							<div>
								<fieldset id="hearAboutUs">
									<legend className="text-sm font-semibold leading-6 text-gray-900">
										How did you hear about us?
									</legend>
									<div className="mt-1 space-y-1">
										<div className="relative flex gap-x-3">
											<div className="flex items-center h-6">
												<input
													id="facebook"
													name="facebook"
													type="checkbox"
													className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
												/>
											</div>
											<div className="text-sm leading-6">
												<label
													htmlFor="facebook"
													className="font-medium text-gray-900"
												>
													Facebook
												</label>
											</div>
										</div>
										<div className="relative flex gap-x-3">
											<div className="flex items-center h-6">
												<input
													id="linkedIn"
													name="linkedIn"
													type="checkbox"
													className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
												/>
											</div>
											<div className="text-sm leading-6">
												<label
													htmlFor="linkedIn"
													className="font-medium text-gray-900"
												>
													LinkedIn
												</label>
											</div>
										</div>
										<div className="relative flex gap-x-3">
											<div className="flex items-center h-6">
												<input
													id="jobPortal"
													name="jobPortal"
													type="checkbox"
													className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
												/>
											</div>
											<div className="text-sm leading-6">
												<label
													htmlFor="jobPortal"
													className="font-medium text-gray-900"
												>
													Job Portal
												</label>
											</div>
										</div>
										<div className="relative flex gap-x-3">
											<div className="flex items-center h-6">
												<input
													id="other"
													name="other"
													type="checkbox"
													className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
												/>
											</div>
											<div className="text-sm leading-6">
												<label
													htmlFor="other"
													className="font-medium text-gray-900"
												>
													Other
												</label>
											</div>
										</div>
									</div>
								</fieldset>
							</div>

							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Password
								</label>
								<div className="mt-2">
									<input
										id="password"
										name="password"
										type="password"
										autoComplete="password"
										required
										className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none px-2 font-semibold"
									/>
								</div>
							</div>

							<div>
								<button
									type="submit"
									className="submitButton"
								>
									Sign up
								</button>
							</div>
						</form>

						<p className="mt-6 mb-4 text-sm text-center text-gray-500">
							Already a member?{" "}
							<Link
								to="/login"
								className="font-semibold leading-6 text-[#c59e00] hover:underline"
							>
								Sign in.
							</Link>
						</p>
					</Fade>
				</div>
			</div>
		</>
	);
};

export default Register;
