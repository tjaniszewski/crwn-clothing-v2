import {useContext} from 'react';
import {CartContext} from '../../context/cart.context';

import './checkout-item.styles.scss'

const CheckoutItem = ({checkoutItem: {imageUrl, name, quantity, price, id}}) => {
	const {removeProductFromCart, incrementProductInCart, decrementProductInCart} = useContext(CartContext)

	const removeProduct = () => removeProductFromCart(id);
	const incrementProduct = () => incrementProductInCart(id);
	const decrementProduct = () => decrementProductInCart(id);

	return(
		<div className="checkout-item-container">
			<div className="image-container">
				<img src={imageUrl} alt={name} />
			</div>
			<span className="name">{name}</span>
			<div className="quantity">
				<div className="arrow"
				     onClick={decrementProduct}>
					&#10094;
				</div>
				<span className="value">{quantity}</span>
				<div className="arrow"
				     onClick={incrementProduct}>
					&#10095;
				</div>
			</div>
			<span className="price">${quantity * price}</span>
			<div className="remove-button"
			     onClick={removeProduct}>
				&#10005;
			</div>
		</div>
	)
}

export default CheckoutItem;