const BASE_URL = process.env.REACT_APP_API_URL

const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	} 
	return Promise.reject(`checkResponse - ошибка: ${res.status}`);
	}

export const registration = ({ email, password }) => {
	return fetch(`${BASE_URL}/signup`, {
		method: "POST",
		credentials: 'include',
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ password, email }),
	})
	.then(checkResponse);
}


export const authorization = ({ email, password }) => {
	return fetch(`${BASE_URL}/signin`, {
		method: "POST",
		credentials: 'include',
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ password, email }),
	})
	.then(checkResponse);
}

export const signOut = () => {
	return fetch(`${BASE_URL}/signout`, {
		method: "DELETE",
		credentials: 'include',
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
	})
		.then(checkResponse);
}

export const getContent = () => {
	return fetch(`${BASE_URL}/users/me`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
	})
	.then(checkResponse);
}