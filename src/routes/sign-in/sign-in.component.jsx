import {createUserDocumentFromAuth, signInWithGooglePopup} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(user);
	}

	return (
		<div>
			<h1 onClick={logGoogleUser}>Sign in component</h1>
		</div>
	)
}

export default SignIn;