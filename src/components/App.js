import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../index.css";
import logo from "../images/header-logo.svg";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Card from "./Card";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddCardPopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/auth';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';

// =====>
function App() {
  // Navigate
  const navigate = useNavigate();

  // User state variables
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(true);

  // Popups' state variables
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

  // Selected image state variable
  const [selectedImage, setSelectedImage] = React.useState({});

  // Cards state variables
  const [cards, setCards] = React.useState([]);

  // InfoTooltip state variables
  const [isTipSuccess, setIsTipSuccess] = React.useState(false);
  const [isTipFailed, setIsTipFailed] = React.useState(false);

  // Functions
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
    api
      .deleteCard()
      .then((data) => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  // Handle update user
  function handleUpdateUser(userData) {
    api
      .editProfile(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // Handle avatar update
  function handleAvatarUpdate(avatar) {
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // Handle card like
  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => console.log(err));
  }

  // Handle card delete
  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;

    isOwn &&
      api
        .deleteCard(card._id)
        .then(() =>
          setCards((state) =>
            state.filter((currentCard) => currentCard._id !== card._id)
          )
        )
        .catch((err) => console.log(err));
  }

  // Handle add card submit
  function handleAddCardSubmit(cardData) {
    api
      .createCard(cardData)
      .then((newCard) => {
        console.log("new card", newCard);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // Handle register submit
  function handleRegisterSubmit(email, password) {
    auth.register(email, password)
      .then((res) => {
        setIsTipSuccess(true);
        navigate.push('/signin');
      })
      .catch((err) => {
        console.log(`Something is not working... Error: ${err}`);
        setIsTipFailed(true);
      })
  }

  // Handle login submit
  function handleLoginSubmit(email, password) {
    auth.authorize(email, password)
      .then((res) => {
        // setCurrentUser(currentUser);
        setLoggedIn(true);
        setIsTipSuccess(true);
        navigate.push('/');
        console.log(`Logged in successfully: ${localStorage}`);
      })
  }

  // Handle sign out
  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    console.log(`Logged out successfully: ${localStorage}`);
  }

  // Mounting
  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth.getToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res); // maybe need to stringify
            navigate.push('/');
          }
        })
        .catch((err) => {
          setIsTipFailed(true);
          console.log('Something is not working...');
        })
    }
  }, [loggedIn]);

  React.useEffect(() => {
    // Get user and cards data
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        // User
        setCurrentUser(userData);
        // Cards
        setCards(cardsData);
      })
      .catch((err) => console.log(err));

    // Escape button event listeners
    const closeByEscape = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };
    // Add
    document.addEventListener("keydown", closeByEscape);
    // Remove
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  // JSX
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header logo={logo} />
        <Routes>
          <Route
            exact path="/"
            loggedIn={loggedIn}
            element={
              <ProtectedRoute>
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
              </ProtectedRoute>
            } />
          <Route path="/signup">
            <Register handleRegister={handleRegisterSubmit} />
          </Route>
          <Route path="/signin">
            <Login />
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

        <PopupWithForm
          name="delete-card"
          title="Are you sure?"
          saveButtonTitle="Yes"
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          handleSubmit={deleteCard}
        />

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
