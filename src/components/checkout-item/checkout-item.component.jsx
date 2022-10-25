import {useContext} from 'react';
import {CartContext} from '../../context/cart.context';

import {
	Arrow,
	CheckoutItemContainer,
	Image,
	ImageContainer,
	QuantitySection,
	RemoveButton,
	Section,
	Value,
} from './checkout-item.styles';

const CheckoutItem = ({checkoutItem: {imageUrl, name, quantity, price, id}}) => {
	const {removeProductFromCart, incrementProductInCart, decrementProductInCart} = useContext(CartContext)

	const removeProduct = () => removeProductFromCart(id);
	const incrementProduct = () => incrementProductInCart(id);
	const decrementProduct = () => decrementProductInCart(id);

	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<Image src={imageUrl} alt={name}/>
			</ImageContainer>
			<Section>{name}</Section>
			<QuantitySection>
				<Arrow onClick={decrementProduct}>
					&#10094;
				</Arrow>
				<Value className="value">{quantity}</Value>
				<Arrow onClick={incrementProduct}>
					&#10095;
				</Arrow>
			</QuantitySection>
			<Section>${quantity * price}</Section>
			<RemoveButton onClick={removeProduct}>
				&#10005;
			</RemoveButton>
		</CheckoutItemContainer>
	)
}

export default CheckoutItem;