// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCn18weeYzd4_uXwbIRMK9Y8Pq73bXI5no",
	authDomain: "crwn-clothing-db-30958.firebaseapp.com",
	projectId: "crwn-clothing-db-30958",
	storageBucket: "crwn-clothing-db-30958.appspot.com",
	messagingSenderId: "499586593589",
	appId: "1:499586593589:web:6eaa56b4d53e7b1ebd127c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if (userSnapshot.exists()) return userDocRef;

	const { displayName, email } = userAuth;
	const createdAt = new Date();

	try {
		await setDoc(userDocRef, {
			displayName,
			email,
			createdAt
		})
	} catch (error) {
		console.log(error)
	}

	return userDocRef;
}