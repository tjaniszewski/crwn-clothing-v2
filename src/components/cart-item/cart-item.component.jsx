import {CartItemContainer, Detail, CartItemImage, ItemDetails} from './cart-item.styles';


const CartItem = ({cartItem: {name, quantity, imageUrl, price}}) => {
	return (
		<CartItemContainer>
			<CartItemImage src={imageUrl} alt={`${name}`}/>
			<ItemDetails>
				<Detail>{name}</Detail>
				<Detail>{`${quantity} x $${price}`}</Detail>
			</ItemDetails>
		</CartItemContainer>
	)
}

export default CartItem;