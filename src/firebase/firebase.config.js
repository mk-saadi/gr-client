import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyC696fr2-PU432h_AOGGdAIj0vq6x2l3zM",
	authDomain: "fir-auth-b5c3a.firebaseapp.com",
	projectId: "fir-auth-b5c3a",
	storageBucket: "fir-auth-b5c3a.appspot.com",
	messagingSenderId: "397356430402",
	appId: "1:397356430402:web:10175ee24788629c7f29db",
};

const app = initializeApp(firebaseConfig);

export default app;

export const storage = getStorage();
