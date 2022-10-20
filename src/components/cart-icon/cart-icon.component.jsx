import {useContext} from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss'
import {CartContext} from '../../context/cart.context';

const CartIcon = () => {
	const {cartVisible, setCartVisible, totalQuantity} = useContext(CartContext)

	const toggle = () => setCartVisible(!cartVisible);

	return (
		<div className="cart-icon-container"
		     onClick={toggle}>
			<ShoppingIcon className="shopping-icon" />
			<span className="item-count">{totalQuantity}</span>
		</div>
	)
}

export default CartIcon;