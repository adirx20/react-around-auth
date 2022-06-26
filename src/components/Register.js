import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// =====>
function Register(props) {
    // Registration state variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Registration functions
    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleRegister(email, password);
    }

    // JSX
    return (
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
                        value={props.userEmail}
                        onChange={(evt) => setEmail(evt.target.value)}
                        placeholder='Enter email...'
                        required
                    />
                    <input
                        className='auth__input'
                        id='input-password'
                        type='password'
                        name='password'
                        value={props.password}
                        onChange={(evt) => setPassword(evt.target.value)}
                        placeholder='Enter Password...'
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
                    <p className="auth__text">Already a member?
                        <Link to='/signin' className='auth__link'> {props.link} </Link>
                        here!
                    </p>
                </div>

            </form>
        </section>
    )
}
// <=====

export default Register;
