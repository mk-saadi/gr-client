import { Fade } from "react-awesome-reveal";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";
import useToast from "../hooks/useToast";
import Toast from "../hooks/Toast";

const Login = () => {
	const { signIn } = useContext(AuthContext);
	const { toastType, toastMessage, showToast, hideToast } = useToast();
	const navigate = useNavigate();

	const handleLogin = async (event) => {
		event.preventDefault();
		showToast("loading", "Please wait!");

		const form = event.target;
		const email = form.email.value;
		const passwordInput = form.password;
		const password = passwordInput.value;

		if (password.length < 8) {
			showToast("error", "password must be at least 8 characters");
			passwordInput.value = "";
			return;
		}

		try {
			const res = await signIn(email, password);
			const user = res.user;
			if (user.uid) {
				showToast("success", "successfully signed in");
				form.reset();

				navigate("/");
				// setTimeout(() => {
				// 	navigate("/home");
				// }, 1500);
			}
		} catch (error) {
			showToast("error", "Error, please try again");
		}

		// signIn(email, password)
		// 	.then((res) => {
		// 		const user = res.user;
		// 		if (user.uid) {
		// 			showToast(
		// 				"success",
		// 				`successfully signed in as ${user.displayName}`
		// 			);
		// 			form.reset();

		// 			setTimeout(() => {
		// 				navigate("/");
		// 			}, 1500);
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		passwordInput.value = "";

		// 		showToast("error", "Error, please try again");
		// 	});
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
			<div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
				<div className="h-full sm:mx-auto sm:w-full sm:max-w-sm">
					<Fade
						triggerOnce
						className="text-[#f7cf31] text-3xl text-center font-semibold"
					>
						GURUKUL
					</Fade>
					<Fade
						triggerOnce
						className="mt-4 text-xl font-bold leading-9 tracking-tight text-center text-gray-900"
					>
						Sign in to your account
					</Fade>
				</div>

				<Fade
					damping={1}
					triggerOnce
					className=" sm:mx-auto sm:w-full sm:max-w-sm"
				>
					<form
						className="space-y-6"
						method="POST"
						onSubmit={handleLogin}
					>
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
								Sign in
							</button>
						</div>
					</form>

					<p className="mt-10 text-sm text-center text-gray-500">
						Not a member?{" "}
						<Link
							to="/register"
							className="font-semibold leading-6 text-[#c59e00] hover:underline"
						>
							Sign up here.
						</Link>
					</p>
				</Fade>
			</div>
		</>
	);
};
export default Login;
