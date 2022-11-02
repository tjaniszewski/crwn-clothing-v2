export const USER_ACTION_TYPES = {
	SET_CURRENT_USER: 'user/SET_CURRENT_USER'
}

export const setCurrentUser = (user) => ({
	type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user
})