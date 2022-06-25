import React from 'react';
import { Routes, Route, useHistory } from 'react-router-dom';
import '../index.css';
import logo from '../images/header-logo.svg';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Card from './Card';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddCardPopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import ProtectedRoute from './ProtectedRoute';

// =====>
function App() {
  // USER STATE VARIABLES
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  // POPUPS' STATE VARIABLES
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

  // SELECTED IMAGE STATE VARIABLE
  const [selectedImage, setSelectedImage] = React.useState({});

  // CARDS STATE VARIABLES
  const [cards, setCards] = React.useState([]);

  // FUNCTIONS
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(!isAddCardPopupOpen);
  }

  function handleCardClick() {
    setIsImagePopupOpen(!isImagePopupOpen);
  }

  function handleImageClick(element) {
    setSelectedImage(element);
  }

  function handleDeleteCardClick() {
    setIsDeleteCardPopupOpen(!isDeleteCardPopupOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
  }

  function deleteCard() {
    api.deleteCard()
      .then((data) => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log('error', err);
      })
  }

  // HANDLE UPDATE USER
  function handleUpdateUser(userData) {
    api.editProfile(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // HANDLE AVATAR UPDATE
  function handleAvatarUpdate(avatar) {
    api.editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  // HANDLE CARD LIKE
  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
      })
      .catch((err) => console.log(err));
  }

  // HANDLE CARD DELETE
  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;

    isOwn && api.deleteCard(card._id)
      .then(() => setCards((state) => state.filter((currentCard) => currentCard._id !== card._id)))
      .catch((err) => console.log(err))
  }

  // HANDLE ADD CARD SUBMIT
  function handleAddCardSubmit(cardData) {
    api.createCard(cardData)
      .then((newCard) => {
        console.log('new card', newCard);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // MOUNTING
  React.useEffect(() => {
    // GET USER AND CARDS DATA
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        // USER
        setCurrentUser(userData);
        // CARDS
        setCards(cardsData);
      })
      .catch((err) => console.log(err));

    // ESCAPE BUTTON EVENT LISTENERS
    const closeByEscape = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    // ADD
    document.addEventListener('keydown', closeByEscape);
    // REMOVE
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [])

  // JSX
  return (

    <div className='page'>

      <CurrentUserContext.Provider value={currentUser}>

        <Header logo={logo} />

        <Routes>
          <Route exact path='/' loggedIn={loggedIn} element={<ProtectedRoute />}>
            <Main
              onEditProfileClick={handleEditProfileClick}
              onAddCardClick={handleAddCardClick}
              onEditAvatarClick={handleEditAvatarClick}
              onCardClick={handleCardClick}
              deleteCardButton={handleDeleteCardClick}
              onImageClick={handleImageClick}
              onClose={closeAllPopups}
              isImagePopupOpen={isImagePopupOpen}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </Route>
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleAvatarUpdate}
        />

        <AddCardPopup
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCardSubmit}
        />

        <PopupWithForm name='delete-card' title='Are you sure?' saveButtonTitle='Yes'
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          handleSubmit={deleteCard} />

        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          imageLink={selectedImage.link}
          imageCaption={selectedImage.name}
        />

      </CurrentUserContext.Provider>

    </div>

  );
}
// <=====

export default App;
