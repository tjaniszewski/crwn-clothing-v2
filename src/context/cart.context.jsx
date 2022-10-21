import {setSelectionRange} from '@testing-library/user-event/dist/utils';
import {createContext, useEffect, useState} from 'react';
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

export const CartProvider = ({children}) => {
	const [cartItems, setCartItems] = useState([]);
	const [cartVisible, setCartVisible] = useState(false);
	const [totalQuantity, setTotalQuantity] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	}

	const decrementProductInCart = (productId) => {
		setCartItems(decrementProduct(cartItems, productId))
	}

	const incrementProductInCart = (productId) => {
		setCartItems(incrementProduct(cartItems, productId))
	}

	const removeProductFromCart = (productId) => {
		setCartItems(removeProduct(cartItems, productId))
	}

	useEffect(() => {
		setTotalQuantity(countTotalQuantity(cartItems));
		setTotalPrice(countTotalPrice(cartItems));
	}, [cartItems])

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