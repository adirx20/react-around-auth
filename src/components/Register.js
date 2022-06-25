import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// =====>
function Register(props) {
    // Registration state variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Registration functions
    const handleSubmit = () => {

    }

    // JSX
    return (
        <section className='register'>
            <form
                className='register__form'
                onSubmit={handleSubmit}
            >
                <div>
                    <h1 className='register__title'>{props.title}</h1>
                    <input
                        className='register__input'
                        id='input-email'
                        type='email'
                        name='email'
                        value={props.userEmail}
                        onChange={(evt) => setEmail(evt.target.value)}
                        placeholder='Enter email...'
                        required
                    />
                    <input
                        className='register__input'
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
                        className='register__submit'
                        type='submit'
                    >
                        {props.title}
                    </button>
                    <p className="register__text">Already a member?
                        <Link to='/signin' className='register__link'> {props.link} </Link>
                        here!
                    </p>
                </div>

            </form>
        </section>
    )
}
// <=====

export default Register;
