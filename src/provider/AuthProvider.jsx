import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithRedirect,
	signOut,
	updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import app from "../firebase/firebase.config";

const auth = getAuth(app);

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const GoogleProvider = new GoogleAuthProvider();

	GoogleProvider.setCustomParameters({
		prompt: "login",
	});

	const signInWithGoogleRedirect = () => {
		signInWithRedirect(auth, GoogleProvider);
	};

	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	};

	const signUp = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const updateProfileInfo = (displayName, photoURL) => {
		return updateProfile(auth.currentUser, {
			displayName: displayName,
			photoURL: photoURL,
		});
	};

	const signIn = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			if (currentUser) {
				axios
					.post("http://localhost:2500/jwt", {
						email: currentUser.email,
					})
					.then((data) => {
						localStorage.setItem("access-token", data.data.token);
						setLoading(false);
					});
			} else {
				localStorage.removeItem("access-token");
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const authInfo = {
		user,
		loading,
		setLoading,
		logOut,
		updateProfileInfo,
		signUp,
		signIn,
		auth,
		signInWithGoogleRedirect,
	};

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
