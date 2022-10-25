import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {CartContext} from '../../context/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import {CartDropdownContainer, CartItems, EmptyMessage} from './cart-dropdown.styles';

const CartDropdown = () => {
	const {cartItems, setCartVisible} = useContext(CartContext)
	const navigate = useNavigate();

	const goToCheckout = () => {
		navigate('/checkout');
		setCartVisible(false)
	}

	return (
		<CartDropdownContainer>
			<CartItems>
				{
					cartItems.length ? cartItems.map(
						(cartItem) => (
							<CartItem key={cartItem.id}
							          cartItem={cartItem} />
						)
					) : <EmptyMessage>Your cart is empty</EmptyMessage>
				}
			</CartItems>
			<Button type="button" onClick={goToCheckout}>GO TO CHECKOUT</Button>
		</CartDropdownContainer>
	)
}

export default CartDropdown;