export const CATEGORIES_ACTION_TYPES = {
	SET_CATEGORIES: 'categories/SET_CATEGORIES',
}

export const setCategories = (categories) => ({
	type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES, payload: categories,
})