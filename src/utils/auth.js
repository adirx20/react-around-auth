export const BASE_URL = 'https://api.around-express.students.nomoredomainssbs.ru';
// export const BASE_URL = 'http://localhost:3001';

const generateHeaders = () => {
    const jwt = localStorage.getItem('jwt');
    return {
        Accept: 'application/json',
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
    };
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/users/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => {checkResponse(res); console.log('auth log: ', res)})
        .catch((err) => console.log(err));
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/users/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => checkResponse(res))
        .catch((err) => console.log(err));
};

// export const getToken = (token) => {
//     console.log(token);
//     return fetch(`${BASE_URL}/users/me`, {
//         method: 'GET',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             authorization: `Bearer ${token}`,
//         },
//     })
//         .then((res) => checkResponse(res))
//         .catch((err) => console.log(err));
// };

export const getToken = (token) => {
    console.log(token);
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: generateHeaders(),
    })
        .then((res) => checkResponse(res))
        .catch((err) => console.log(err));
};

function checkResponse(res) {
    if (res.ok) {
        console.log(res);
        return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
}
