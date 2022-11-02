import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Route, Routes} from 'react-router-dom';
import Authentication from './routes/authentication/authentication.component';
import Checkout from './routes/checkout/checkout.component';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';
import {setCurrentUser} from './store/user/user.action';
import {createUserDocumentFromAuth, onAuthStateChangedListener} from './utils/firebase/firebase.utils';

const App = () => {
  const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener(async (user) => {
			if (user) {
				await createUserDocumentFromAuth(user)
			}

			dispatch(setCurrentUser(user))
		})

		return unsubscribe;
	}, [dispatch])

	return (
		<Routes>
			<Route path="/" element={<Navigation/>}>
				<Route index element={<Home/>}/>
				<Route path="shop/*" element={<Shop/>}/>
				<Route path="checkout" element={<Checkout/>}/>
				<Route path="auth" element={<Authentication/>}/>
			</Route>
		</Routes>
	)
};

export default App;
