export const BASE_URL = 'https://register.nomoreparties.co';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
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

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log('asadasda', data.token);
            if (data.token) {
                console.log(data.token)
                localStorage.setItem('jwt', data.token);
                return data;
            }
        })
        .catch((err) => console.log(err));
};

 export const getToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
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