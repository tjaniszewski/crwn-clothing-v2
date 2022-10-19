import {useState} from 'react';
import {
	createUserDocumentFromAuth,
	getUserDocument,
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

const defaultFormFields = {
	email: '',
	password: '',
}

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const {email, password} = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	}

	const handleChange = (event) => {
		const {name, value} = event.target;

		setFormFields({...formFields, [name]: value})
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		if(!email || !password) {
			alert('Provide credentials');
			return;
		}

		try {
			const loggedUserRef = await signInAuthUserWithEmailAndPassword(formFields);
			const loggedUserData = await getUserDocument(loggedUserRef.user);

			console.log(loggedUserData)

			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case 'auth/user-not-found':
					alert('No such user');
					break;
				case 'auth/wrong-password':
					alert('Wrong password');
					break;
				default:
					console.log(error);
			}
		}
	}

	const signInWithGoogle = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = createUserDocumentFromAuth(user);
	}


	return (
		<div className="sign-up-container">
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit} method="post">
				<FormInput label="Email"
				           required
				           type="text"
				           name="email"
				           value={email}
				           onChange={handleChange}
				/>
				<FormInput label="Password"
				           required
				           type="password"
				           name="password"
				           minLength="6"
				           value={password}
				           onChange={handleChange}
				/>
				<div className="buttons-container">
					<Button type="submit">
						SIGN IN
					</Button>
					<Button buttonType="google"
					        type="button"
					        onClick={signInWithGoogle}>
						SIGN IN WITH GOOGLE
					</Button>
				</div>
			</form>
		</div>
	)
}

export default SignInForm;