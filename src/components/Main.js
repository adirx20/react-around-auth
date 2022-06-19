import React from 'react';
import ReactDOM from 'react-dom';
import api from '../utils/api';
import ImagePopup from './ImagePopup';
import Card from '../components/Card';

// =====>
function Main(props) {
    // const cards = props.cardsElement;

    // USER DATA STATE VARIABLES
    const [userId, setUserId] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');

    // CARDS STATE VARIABLES
    const [cards, setCards] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState(null);

    // FUNCTIONS
    function handleImage() {
        props.onCardClick();
    }

    function handleDeleteCardClick(id) {
        setSelectedCard(id);
        props.deleteCardButton();
    }

    function handleLikeButtonClick(id) {
        setSelectedCard(id);
    }

    // USE EFFECT
    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, cardsData]) => {
                // USER
                setUserId(userData._id);
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);
                // CARDS
                setCards(cardsData);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (

        <main className='content'>

            <section className='profile'>
                <div className='profile__avatar-container'>
                    <img className='profile__avatar' src={userAvatar} alt={`${userName} Avatar`} />
                    <div className='profile__avatar-overlay'></div>
                    <button className='profile__avatar-button button-effect' type='button' aria-label='edit' onClick={props.onEditAvatarClick}></button>
                </div>
                <div className='profile__info-container'>
                    <h1 className='profile__name'>{userName}</h1>
                    <button className='profile__edit-button button-effect' type='button' aria-label='edit' onClick={props.onEditProfileClick}></button>
                    <p className='profile__profession'>{userDescription}</p>
                </div>
                <button className='profile__add-button button-effect' type='button' aria-label='add' onClick={props.onAddCardClick}></button>
            </section>

            <section className='elements'>
                {
                    cards.map((element) => (
                        <Card
                            card={element} key={element._id}
                            onDeleteCardClick={handleDeleteCardClick}
                            onLikeClick={handleLikeButtonClick}
                            userId={userId}
                            onCardClick={props.onImageClick}
                            renderImage={handleImage}
                        />
                    ))
                }
            </section>

        </main>

    );
}
// <=====

export default Main;