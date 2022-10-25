import {useContext} from 'react';
import {CartContext} from '../../context/cart.context';
import Button, {BUTTON_TYPES_CLASSES} from '../button/button.component';

import './product-card.styles'
import {Footer, Name, Price, ProductCartContainer} from './product-card.styles';

const ProductCard = ({product}) => {
	const {imageUrl, name, price} = product;
	const {addItemToCart} = useContext(CartContext)

	const addProductToCart = () => addItemToCart(product)

	return (
		<ProductCartContainer>
			<img src={imageUrl} alt={`${name}`}/>
			<Footer>
				<Name>
					{name}
				</Name>
				<Price>
					{price}
				</Price>
			</Footer>
			<Button buttonType={BUTTON_TYPES_CLASSES.inverted}
			        type="button"
			        onClick={addProductToCart}
			>
				Add to cart
			</Button>
		</ProductCartContainer>
	)
}

export default ProductCard;