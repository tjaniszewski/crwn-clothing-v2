export const CART_ACTION_TYPES = {
	SET_CART_ITEMS: 'SET_CART_ITEMS',
	SET_TOTAL_PRICE: 'SET_TOTAL_PRICE',
	SET_TOTAL_QUANTITY: 'SET_TOTAL_QUANTITY',
	TOGGLE_CART_VISIBILITY: 'TOGGLE_CART_VISIBILITY',
}

const INITIAL_STATE = {
	cartItems: [],
	cartVisible: false,
	totalPrice: 0,
	totalQuantity: 0,
}

export const cartReducer = (state = INITIAL_STATE, action) => {
	const {type, payload} = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				cartItems: payload.cartItems,
				totalPrice: payload.totalPrice,
				totalQuantity: payload.totalQuantity,
			};
		case CART_ACTION_TYPES.TOGGLE_CART_VISIBILITY:
			return {
				...state,
				cartVisible: payload.cartVisible,
			};
		default:
			return state;
	}
}