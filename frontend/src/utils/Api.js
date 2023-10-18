const BASE_URL = process.env.REACT_APP_API_URL

class Api {
	constructor(options) {
		this._url = options.url;
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
		return this._request('/cards', {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json',
			}
		})
	}

	getDataUser() {
		return this._request('/users/me', {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json',
			}
		})
	}

	setDataUser(data) {
		return this._request('/users/me', {
			method: 'PATCH',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: data.name,
				about: data.about })
		})
	}

	setUserAvatar(avatar) {
		return this._request('/users/me/avatar', {
			method: 'PATCH',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(avatar)
		})
	}

	addNewCard(card) {
		return this._request('/cards', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(card)
		})
	}

	deleteCard(cardId) {
		return this._request(`/cards/${cardId}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json',
			}
		})
	}

	changeLikeCardStatus(cardId, isLiked) {
		return this._request(`/cards/${cardId}/likes`, {
			method: isLiked ? "DELETE" : "PUT",
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json',
			}
		})
	}
}

export const api = new Api({ url: BASE_URL })