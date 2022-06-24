import { NavLink } from 'react-router-dom';

// =====>
function Header(props) {
    return (

        <header className='header'>
            <img className='header__logo' src={props.logo} alt='Around the U.S. logo' />
            <div>
                <NavLink to='/' className='header__links'>

                </NavLink>
            </div>
        </header>

    );
}
// <=====

export default Header;