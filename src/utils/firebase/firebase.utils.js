// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import {doc, getDoc, getDocs, getFirestore, setDoc, collection, writeBatch, query} from 'firebase/firestore';
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
initializeApp(firebaseConfig);
const googleAuthProvider = new GoogleAuthProvider();

googleAuthProvider.setCustomParameters({
	prompt: 'select_account',
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleAuthProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const documentRef = doc(collectionRef, object.title.toLowerCase());

		batch.set(documentRef, object)
	})

	await batch.commit();
}

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

export const getCategoriesAndDocuments = async () => {
	const collectionRef = await collection(db, 'categories');
	const q = query(collectionRef);
	const querySnapshot = await getDocs(q);
	// const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
	// 	const {title, items} = docSnapshot.data();
	//
	// 	acc[title.toLowerCase()] = items;
	//
	// 	return acc;
	// }, {})
	//
	// return categoryMap

	return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)