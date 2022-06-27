import { Link } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';

// =====>
function Header({ currentUser, headerStatus, logOut, ...props }) {
    return (

        <header className='header'>
            <img
                className='header__logo'
                src={props.logo}
                alt='Around the U.S. logo'
            />
            {
                (
                    headerStatus === '/signup'
                    &&
                    <Link className='header__link' to='/signin'>
                        Login
                    </Link>
                )
                ||
                (
                    headerStatus === '/signin'
                    &&
                    <Link className='header__link' to='/signup'>
                        Register
                    </Link>
                )
                ||
                (
                    headerStatus === 'main'
                    &&
                    <>
                        <p className='header__user-email'>{currentUser.email}</p>
                        <button
                            className='header__logout-button button-effect'
                            type='button'
                            onClick={logOut}
                        >
                            Log Out
                        </button>
                    </>
                )
            }
        </header>

    );
}
// <=====

export default Header;