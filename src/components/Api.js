export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this.checkServerResponse);
  }

  checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  addCard({ name, link }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    });
  }

  removeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  likeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  unlikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  updateUserInfo(userData) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.description,
      }),
    });
  }

  updateUserAvatar(userData) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: userData.link }),
    });
  }

  getUserAndCards() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]).then(
      ([userInfo, cards]) => {
        return { userInfo, cards };
      }
    );
  }
}
