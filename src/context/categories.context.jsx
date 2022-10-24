import {createContext, useEffect, useState} from 'react';

import {getCategoriesAndDocuments} from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
	categoriesMap: {},
	setCategoriesMap: () => null,
})

export const CategoriesProvider = ({children}) => {
	const [categoriesMap, setCategoriesMap] = useState({});
	const value = {categoriesMap, setCategoriesMap};

	useEffect(() => {
		const getInitialData = async () => {
			const data = await getCategoriesAndDocuments();

			setCategoriesMap(data);
		}

		getInitialData();
	}, [])

	return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}