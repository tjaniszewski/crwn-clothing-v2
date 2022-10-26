import {createContext, useReducer} from 'react';
import {
	addCartItem,
	countTotalPrice,
	countTotalQuantity,
	decrementProduct,
	incrementProduct,
	removeProduct,
} from './cart.context.utils';

export const CartContext = createContext({
	cartItems: [],
	cartVisible: false,
	totalPrice: 0,
	totalQuantity: 0,
	setCartVisible: () => null,
	addItemToCart: () => null,
	removeProductFromCart: () => null,
	incrementProductInCart: () => null,
	decrementProductInCart: () => null,
})

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

export const cartReducer = (state, action) => {
	const {type, payload} = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				cartItems: payload.cartItems,
				totalPrice: payload.totalPrice,
				totalQuantity: payload.totalQuantity,
			}
		case CART_ACTION_TYPES.TOGGLE_CART_VISIBILITY:
			return {
				...state,
				cartVisible: payload.cartVisible,
			}
		default:
			throw new Error(`Unhandled action: ${type} in cartReducer`)
	}
}

export const CartProvider = ({children}) => {
	const [{cartItems, cartVisible, totalQuantity, totalPrice}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

	const updateCartItemsReducer = (newCartItems) => {
		const newTotalPrice = countTotalPrice(newCartItems);
		const newTotalQuantity = countTotalQuantity(newCartItems);

		dispatch({
			type: CART_ACTION_TYPES.SET_CART_ITEMS,
			payload: {cartItems: newCartItems, totalPrice: newTotalPrice, totalQuantity: newTotalQuantity},
		})
	}

	const addItemToCart = (productToAdd) => {
		const newCartItems = addCartItem(cartItems, productToAdd);

		updateCartItemsReducer(newCartItems);
	}

	const decrementProductInCart = (productId) => {
		const newCartItems = decrementProduct(cartItems, productId);

		updateCartItemsReducer(newCartItems);
	}

	const incrementProductInCart = (productId) => {
		const newCartItems = incrementProduct(cartItems, productId);

		updateCartItemsReducer(newCartItems);
	}

	const removeProductFromCart = (productId) => {
		const newCartItems = removeProduct(cartItems, productId);

		updateCartItemsReducer(newCartItems);
	}

	const setCartVisible = (open) => {
		dispatch({type: CART_ACTION_TYPES.TOGGLE_CART_VISIBILITY, payload: {cartVisible: open}})
	}

	const value = {
		addItemToCart,
		cartItems,
		cartVisible,
		decrementProductInCart,
		incrementProductInCart,
		removeProductFromCart,
		setCartVisible,
		totalQuantity,
		totalPrice,
	}

	return (
		<CartContext.Provider value={value}>
			{children}
		</CartContext.Provider>
	)
}