import {useNavigate} from 'react-router-dom';
import ProductCard from '../product-card/product-card.component';
import {CategoryPreviewContainer, Preview, Title} from './category-preview.styles';

const CategoryPreview = ({title, products}) => {
	const navigate = useNavigate();

	const goToCategory = () => navigate(`/shop/${title}`)

	return (
		<CategoryPreviewContainer>
			<Title onClick={goToCategory}>
				{title.toUpperCase()}
			</Title>
			<Preview>
				{
					products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product}/>)
				}
			</Preview>
		</CategoryPreviewContainer>
	)
}

export default CategoryPreview;