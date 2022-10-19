import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import {
	createUserDocumentFromAuth,
	signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(user);
	}

	return (
		<SignUpForm />
	)
}

export default SignIn;