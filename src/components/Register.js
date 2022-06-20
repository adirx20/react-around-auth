import { React, useState } from 'react';
import { Link } from 'react-router-dom';

// =====>
function Register(props) {
    // Registration state variables
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Registration functions
    const handleSubmit = () => {
        if (password === confirmPassword) {

        }
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
                        id='input-username'
                        type='username'
                        name='username'
                        value={username}
                        onChange={(evt) => setUsername(evt.target.value)}
                        placeholder='Enter username...'
                        required
                    />
                    <input
                        className='register__input'
                        id='input-email'
                        type='email'
                        name='email'
                        value={email}
                        onChange={(evt) => setEmail(evt.target.value)}
                        placeholder='Enter email...'
                        required
                    />
                    <input
                        className='register__input'
                        id='input-password'
                        type='password'
                        name='password'
                        value={password}
                        onChange={(evt) => setPassword(evt.target.value)}
                        placeholder='Enter Password...'
                        required
                    />
                    <input
                        className='register__input'
                        id='input-confirm-password'
                        type='confirm-password'
                        name='confirm-password'
                        value={confirmPassword}
                        onChange={(evt) => setConfirmPassword(evt.target.value)}
                        placeholder='Enter Password Again...'
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
