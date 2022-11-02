import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Route, Routes} from 'react-router-dom';
import {setCategories} from '../../store/categories/categories.action';
import {getCategoriesAndDocuments} from '../../utils/firebase/firebase.utils';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

const Shop = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const getInitialData = async () => {
			const categoriesArray = await getCategoriesAndDocuments();

			dispatch(setCategories(categoriesArray));
		}

		getInitialData();
	}, [dispatch])

	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=":category" element={<Category />} />
		</Routes>
	)
}

export default Shop;