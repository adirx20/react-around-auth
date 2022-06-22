import { React, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth';

// =====>
function Login(props) {
    // Login history
    const history = useHistory();

    // Login state variables
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    // Login functions
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!username || !password) {
            return;
        } else {
            auth.authorize(username, password)
            .then((res) => {
                if (res.jwt) {
                    setUsername('');
                    setPassword('');

                    props.handleLogin();
                    history.push('/profile');
                }
            })
        }
    }

    // JSX
    return (
        // need to complete here
    )
}
// <=====

export default Login;