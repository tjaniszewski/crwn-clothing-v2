import {useContext} from 'react';
import {useParams} from 'react-router-dom';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import {CategoriesContext} from '../../context/categories.context';

const CategoriesPreview = () => {
	const {categoriesMap} = useContext(CategoriesContext);

	return (
		<>
			{
				Object.keys(categoriesMap).map((title) => {
					const products = categoriesMap[title];

					return (
						<CategoryPreview key={title} title={title} products={products}/>
					)
				})
			}
		</>
	)
}

export default CategoriesPreview;