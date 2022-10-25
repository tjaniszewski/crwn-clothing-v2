import {useState} from 'react';
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import './sign-up-form.styles'
import {SignUpContainer} from './sign-up-form.styles';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
}

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const {displayName, email, password, confirmPassword} = formFields;

	const handleChange = (event) => {
		const {name, value} = event.target;

		setFormFields({...formFields, [name]: value})
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) return;

		try {
			const {user} = await createAuthUserWithEmailAndPassword(formFields);

			await createUserDocumentFromAuth(user, {displayName});

			resetFormFields();
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				alert('Email already in use')
			} else {
				console.log(error)
			}
		}
	}

	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}

	return (
		<SignUpContainer>
			<h2>Don't have an acount?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput label="Display name"
				           required
				           type="text"
				           name="displayName"
				           value={displayName}
				           onChange={handleChange}
				/>
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
				<FormInput label="Confirm password"
				           required
				           type="password"
				           name="confirmPassword"
				           minLength="6"
				           value={confirmPassword}
				           onChange={handleChange}
				/>

				<Button type="submit">SIGN UP</Button>
			</form>
		</SignUpContainer>
	)
}

export default SignUpForm;