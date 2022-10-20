import {createContext, useEffect, useState} from 'react';

const addCartItem = (cartItems, productToAdd) => {
	const productExists = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

	if (productExists) {
		return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? ({
			...cartItem,
			quantity: cartItem.quantity + 1,
		}) : cartItem)
	}

	return [...cartItems, {...productToAdd, quantity: 1}];
}

const countTotalQuantity = (cartItems) => cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)

export const CartContext = createContext({
	cartVisible: false,
	setCartVisible: () => null,
	cartItems: [],
	addItemToCart: () => null,
	totalQuantity: 0,
})

export const CartProvider = ({children}) => {
	const [cartVisible, setCartVisible] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalQuantity, setTotalQuantity] = useState(0);

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	}

	useEffect(() => {
		setTotalQuantity(countTotalQuantity(cartItems))
	}, [cartItems])

	const value = {cartVisible, setCartVisible, addItemToCart, cartItems, totalQuantity}

	return (
		<CartContext.Provider value={value}>
			{children}
		</CartContext.Provider>
	)
}