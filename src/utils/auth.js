export const BASE_URL = 'https://register.nomoreparties.co';

export const register = (username, password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email })
    })
        .then((res) => {
            if (res.status === 201) {
                return res.json();
            }
        })
        .then((res) => {
            return res;
        })
        .catch((err) => console.log(err));
};

export const authorize = (identifier, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.jwt) {
                localStorage.setItem('jwt', data.jwt);
                return data;
            }
        })
        .catch((err) => console.log(err));
};

 export const getContent = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
    })
    .then((res) => {
        if (res.status === 200) {
            return res.json();
        }
    })
    .then((data) => {
        return data;
    })
    .catch((err) => console.log(err));
};