import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import {selectCategory} from '../../store/categories/categories.selector';
import {CategoryContainer, CategoryTitle} from './category.styles';

const Category = () => {
	const {category: categoryName} = useParams();
	const products = useSelector(selectCategory(categoryName));

	return (
		<>
			<CategoryTitle>{categoryName.toUpperCase()}</CategoryTitle>
			<CategoryContainer>
				{
					products && products.map((product) => <ProductCard key={product.id} product={product}/>)
				}
			</CategoryContainer>
		</>
	)
}

export default Category;