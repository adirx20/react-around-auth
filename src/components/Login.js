import React ,{ useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';

// =====>
function Login(props) {
    // Login history
    const history = useNavigate();

    // Login state variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Login functions
    const handleSubmit = (evt) => {
        evt.preventDefault();   
        props.handleLogin(email, password);
    }

    // JSX
    return (
        // need to complete here
        <section className='auth'>
            <form
                className='auth__form'
                onSubmit={handleSubmit}
            >
                <div>
                    <h1 className='auth__title'>{props.title}</h1>
                    <input
                        className='auth__input'
                        id='input-email'
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter email...'
                        required
                    />
                    <input
                        className='auth__input'
                        id='input-password'
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter password...'
                        required
                    />
                </div>
                <div>
                    <button
                        className='auth__submit'
                        type='submit'
                    >
                        {props.title}
                    </button>
                    <p className="auth__text">Not a member yet?
                        <Link to='/signup' className='auth__links'> {props.link} </Link>
                        here!
                    </p>
                </div>

            </form>
        </section>
    )
}
// <=====

export default Login;