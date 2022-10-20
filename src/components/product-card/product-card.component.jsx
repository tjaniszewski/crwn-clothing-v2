import Button from '../button/button.component';

import './product-card.styles.scss'

const ProductCard = ({product: {imageUrl, name, price}}) => {
	return (
		<div className="product-card-container">
			<img src={imageUrl} alt={`${name} photo`}/>
			<div className="footer">
				<span className="name">
					{name}
				</span>
				<span className="price">
					{price}
				</span>
			</div>
			<Button buttonType="inverted"
			        type="button">
				Add to cart
			</Button>
		</div>
	)
}

export default ProductCard;