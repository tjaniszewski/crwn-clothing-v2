import {useContext} from 'react';

import {CartContext} from '../../context/cart.context';
import {CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles';

const CartIcon = () => {
	const {cartVisible, setCartVisible, totalQuantity} = useContext(CartContext)

	const toggle = () => setCartVisible(!cartVisible);

	return (
		<CartIconContainer onClick={toggle}>
			<ShoppingIcon />
			<ItemCount>{totalQuantity}</ItemCount>
		</CartIconContainer>
	)
}

export default CartIcon;