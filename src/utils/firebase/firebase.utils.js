// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth';
import {doc, getDoc, getFirestore, setDoc} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCn18weeYzd4_uXwbIRMK9Y8Pq73bXI5no',
	authDomain: 'crwn-clothing-db-30958.firebaseapp.com',
	projectId: 'crwn-clothing-db-30958',
	storageBucket: 'crwn-clothing-db-30958.appspot.com',
	messagingSenderId: '499586593589',
	appId: '1:499586593589:web:6eaa56b4d53e7b1ebd127c',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleAuthProvider = new GoogleAuthProvider();

googleAuthProvider.setCustomParameters({
	prompt: 'select_account',
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleAuthProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if (userSnapshot.exists()) return userDocRef;

	const {displayName, email} = userAuth;
	const createdAt = new Date();

	try {
		await setDoc(userDocRef, {
			displayName,
			email,
			createdAt,
			...additionalInformation,
		})
	} catch (error) {
		console.log(error)
	}

	return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async ({email, password}) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async ({email, password}) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
}

export const getUserDocument = async (userAuth) => {
	const userDocRef = doc(db, 'users', userAuth.uid);
	const userDocSnapshot = await getDoc(userDocRef);

	return userDocSnapshot.data()
}