class Api {
	constructor(options) {
		this._url = options.url;
		this._headers = options.headers;
	}

	_request(endpoint, options) {
		return fetch(this._url + endpoint, options).then(this._handleResponse)
	}

	_handleResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`handleResponse - ошибка: ${res.status}`);
	}

	getDataCards() {
		return this._request('/cards', { headers: this._headers })
	}

	getDataUser() {
		return this._request('/users/me', { headers: this._headers })
	}

	setDataUser(data) {
		return this._request('/users/me', {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: data.name,
				about: data.about })
		})
	}

	setUserAvatar(avatar) {
		return this._request('/users/me/avatar', {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify(avatar)
		})
	}

	addNewCard(card) {
		return this._request('/cards', {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify(card)
		})
	}

	deleteCard(cardId) {
		return this._request(`/cards/${cardId}`, {
			method: 'DELETE',
			headers: this._headers
		})
	}

	changeLikeCardStatus(cardId, isLiked) {
		return this._request(`/cards/${cardId}/likes`, {
			method: isLiked ? "DELETE" : "PUT",
			headers: this._headers,
		})
	}
}

export const api = new Api({
	url: 'https://mesto.nomoreparties.co/v1/cohort-68',
	headers: {
		authorization: 'e0cc1650-18be-49f9-89e7-3eeb4201f8b2',
		'Content-Type': 'application/json',
	}
})