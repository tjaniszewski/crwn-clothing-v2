import './cart-dropdown.styles.scss'
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {CartContext} from '../../context/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = () => {
	const {cartItems, setCartVisible} = useContext(CartContext)
	const navigate = useNavigate();

	const goToCheckout = () => {
		navigate('/checkout');
		setCartVisible(false)
	}

	return (
		<div className="cart-dropdown-container">
			<div className="cart-items">
				{
					cartItems.map(
						(cartItem) => (
							<CartItem key={cartItem.id}
							          cartItem={cartItem} />
						)
					)
				}
			</div>
			<Button type="button" onClick={goToCheckout}>GO TO CHECKOUT</Button>
		</div>
	)
}

export default CartDropdown;