const customFetch = (url, headers) => fetch(url, headers).then((res) =>
    res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`),
);

class Api {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
        // this._headers = this._generateHeaders;
    };

    _generateHeaders() {
        const jwt = localStorage.getItem('jwt');
        return {
            Accept: 'application/json',
            authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
        };
    };

    getInitialCards() {
        return customFetch(`${this._baseUrl}/cards`, {
            headers: this._generateHeaders(),
        });
    };

    getUserInfo() {
        return customFetch(`${this._baseUrl}/users/me`, {
            headers: this._generateHeaders(),
        });
    };

    editProfile(userData) {
        return customFetch(`${this._baseUrl}/users/me`, {
            headers: this._generateHeaders(),
            method: 'PATCH',
            body: JSON.stringify({
                name: userData.name,
                about: userData.about,
            }),
        });
    };

    editAvatar(url) {
        return customFetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this._generateHeaders(),
            method: 'PATCH',
            body: JSON.stringify({
                avatar: url,
            }),
        });
    };

    createCard(cardData) {
        return customFetch(`${this._baseUrl}/cards`, {
            headers: this._generateHeaders(),
            method: 'POST',
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link,
            }),
        });
    };

    deleteCard(cardId) {
        return customFetch(`${this._baseUrl}/cards/${cardId}`, {
            headers: this._generateHeaders(),
            method: 'DELETE',
        });
    };

    likeCard(cardId) {
        return customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            headers: this._generateHeaders(),
            method: 'PUT',
        });
    };

    unlikeCard(cardId) {
        return customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            headers: this._generateHeaders(),
            method: 'DELETE',
        });
    };

    changeLikeCardStatus(cardId, isLiked) {
        return customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            headers: this._generateHeaders(),
            method: isLiked ? 'DELETE' : 'PUT',
        });
    };
};

const api = new Api({
    // baseUrl: 'http://localhost:3002'
    baseUrl: 'https://api.around-express.students.nomoredomainssbs.ru'
    // headers: this._generateHeaders,
});

// New api (user api)
// const jwt = localStorage.getItem('jwt');

// const api = new Api({
//     // baseUrl: 'https://api.around-express.students.nomoredomainssbs.ru',
//     baseUrl: 'http://localhost:3002',
//     headers: {
//         Accept: 'application/json',
//         Origin: 'http://around-express.students.nomoredomainssbs.ru',
//         authorization: `Bearer ${jwt}`,
//         'Content-Type': 'application/json',
//     },
// });
// <=====

export default api;

// Token: 7d25a2aa-7d8e-4eaa-a0f4-d0c8a249fbe0 Group ID: group-12
