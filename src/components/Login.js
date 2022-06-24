import React ,{ useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';

// =====>
function Login(props) {
    // Login history
    const history = useNavigate();

    // Login state variables
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    // Login functions
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!email || !password) {
            return;
        } else {
            auth.authorize(email, password)
                .then((res) => {
                    if (res.jwt) {
                        setEmail('');
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
        <section className='login'>
            <form
                className='login__form'
                onSubmit={handleSubmit}
            >
                <div>
                    <h1 className='login__title'>{props.title}</h1>
                    <input
                        className='login__input'
                        id='input-email'
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your E-mail here...'
                        required
                    />
                    <input
                        className='login__input'
                        id='input-password'
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter your password here...'
                        required
                    />
                </div>
                <div>
                    <button
                        className='login__submit'
                        type='submit'
                    >
                        {props.title}
                    </button>
                    <p className="login__text">Not a member yet?
                        <Link to='/signup' className='login__links'> {props.link} </Link>
                        here!
                    </p>
                </div>

            </form>
        </section>
    )
}
// <=====

export default Login;