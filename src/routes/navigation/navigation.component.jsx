import {useContext} from 'react';
import {Outlet} from 'react-router-dom';

import {ReactComponent as CrownLogo} from '../../assets/crown.svg';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import {CartContext} from '../../context/cart.context';
import {UserContext} from '../../context/user.context';
import {signOutUser} from '../../utils/firebase/firebase.utils';

import {LogoContainer, NavigationContainer, NavLink, NavLinks} from './navigation.styles';

const Navigation = () => {
	const {currentUser} = useContext(UserContext);
	const {cartVisible} = useContext(CartContext)

	const signOutHandler = async () => {
		await signOutUser();
	}

	return (
		<>
			<NavigationContainer>
				<LogoContainer to="/">
					<CrownLogo />
				</LogoContainer>
				<NavLinks>
					<NavLink className="nav-link"
					         to="/shop">
						SHOP
					</NavLink>
					{
						currentUser ?
							(
								<NavLink as="span"
								         onClick={signOutHandler}>
									SIGN OUT
								</NavLink>
							) :
							(
								<NavLink className="nav-link"
								         to="/auth">
									SIGN IN
								</NavLink>
							)
					}
					<CartIcon/>
				</NavLinks>
				{
					cartVisible && <CartDropdown/>
				}
			</NavigationContainer>
			<Outlet/>
		</>
	)
}

export default Navigation;