export const addCartItem = (cartItems, productToAdd) => {
	const productExists = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

	if (productExists) {
		return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? ({
			...cartItem,
			quantity: cartItem.quantity + 1,
		}) : cartItem)
	}

	return [...cartItems, {...productToAdd, quantity: 1}];
}

export const countTotalPrice = (cartItems) => cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)

export const countTotalQuantity = (cartItems) => cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

export const removeProduct = (cartItems, id) => {
	return cartItems.filter((item) => item.id !== id)
}

export const incrementProduct = (cartItems, id) => {
	return cartItems.map((item) => {
		if (item.id !== id) return item;

		return {...item, quantity: item.quantity + 1}
	})
}

export const decrementProduct = (cartItems, id) => {
	return cartItems.map((item) => {
		if (item.id !== id) return item;
		if (item.quantity === 1) return null;

		return {...item, quantity: item.quantity - 1}
	}).filter((item) => item)
}