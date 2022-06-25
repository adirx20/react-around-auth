import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '../index.css';
import ProtectedRoute from './ProtectedRoute';
import logo from '../images/header-logo.svg';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Card from './Card';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Register from './Register';
import Login from './Login';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';
import failedTipIcon from '../images/failed-tip-icon.svg';
import successTipIcon from '../images/success-tip-icon.svg';

// =====>
function App() {
  // History
  const history = useNavigate();

  // Icons

  // Registration and login state variables
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Popups' state variables
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

  // Info tool tip state variables
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = useState(false);
  const [isInfoTooltipFailed, setIsInfoTooltipFailed] = useState(false);

  // Selected image state variable
  const [selectedImage, setSelectedImage] = React.useState({});

  // Auth state variables
  const [loggedIn, setLoggedIn] = React.useState(true);

  // Functions
  // Click handlres
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


  function handleInput(evt) {
    return evt.target.value;
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

  function handleUserRegister(email, password) {
    auth.register(email, password)
      .then((res) => {
        history.push('/signin');
      })
      .catch((err) => {
        console.log(`Something is not working... Error: ${err}`);
      });
  }

  // function handleUserLogin(email, password) {
  //   auth.login(email, password)
  //   .then((res) => {
  //     if (res.token) {
  //       console.log('token: ', res.token);
  //       setLoggedIn(true);
  //       history.push('/');
  //     }
  //   })
  // }

  // EVENT LISTENERS


  // JSX
  return (

    <div className='page'>

      <Routes>
        <Header
          logo={logo}
        />

        <ProtectedRoute
          path='/'
          loggedIn={loggedIn}
        >
          <Main
            onEditProfileClick={handleEditProfileClick}
            onAddCardClick={handleAddCardClick}
            onEditAvatarClick={handleEditAvatarClick}
            onCardClick={handleCardClick}
            deleteCardButton={handleDeleteCardClick}
            onImageClick={handleImageClick}
            onClose={closeAllPopups}
            isImagePopupOpen={isImagePopupOpen}
          />
        </ProtectedRoute>
        <Route path='/signup'>
          {/* <Header
            // loggedIn={isLoggedIn}
            userEmail={email}
            buttonText='Log in'
            url='/signin'
          /> */}
          <Register
            title="Sign up"
            link="Log in"
          // loggedIn={isLoggedIn}
          // onSubmit={handleRegisterSubmit}
          />
        </Route>
        <Route path='/signin'>
          {/* <Header
            // loggedIn={isLoggedIn}
            buttonText='Sign up'
            url='/signup'
          /> */}
          <Login
            title="Log in"
            link='Sign up'
            loggedIn={setLoggedIn}
          // onSubmit={handleLoginSubmit}
          />
        </Route>
      </Routes>

      <Footer />

      <PopupWithForm
        name='edit-profile'
        title='Edit profile'
        saveButtonTitle='Save'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input id='name-input' className='form__input form__input_type_name' type='text' name='name' placeholder='Name'
          defaultValue='' required minLength='2' maxLength='40' />
        <span id='name-input-error' className='form__input-error-message'></span>
        <input id='proffession-input' className='form__input form__input_type_profession' type='text' name='profession'
          placeholder='About me' defaultValue='' required minLength='2' maxLength='200' />
        <span id='proffession-input-error' className='form__input-error-message'></span>
      </PopupWithForm>

      <PopupWithForm
        name='edit-avatar'
        title='Change profile picture'
        saveButtonTitle='Save'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input id='avatar-link-input' className='form__input form__input_type_avatar-link' type='url' name='avatar-link'
          placeholder='Image URL' defaultValue='' required onChange={handleInput} />
        <span id='avatar-link-input-error' className='form__input-error-message'></span>
      </PopupWithForm>

      <PopupWithForm
        name='add-card'
        title='New Place'
        saveButtonTitle='Save'
        isOpen={isAddCardPopupOpen}
        onClose={closeAllPopups}
      >
        <input id='card-input' className='form__input form__input_type_card-title' type='text' name='card-title'
          placeholder='Title' defaultValue='' required minLength='1' maxLength='30' />
        <span id='card-input-error' className='form__input-error-message'></span>
        <input id='card-link-input' className='form__input form__input_type_card-link' type='url' name='card-link'
          placeholder='Image URL' defaultValue='' required />
        <span id='card-link-input-error' className='form__input-error-message'></span>
      </PopupWithForm>

      <PopupWithForm
        name='delete-card'
        title='Are you sure?'
        saveButtonTitle='Yes'
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

      <InfoTooltip
        name='success-tip'
        isOpen={isInfoTooltipSuccess}
        onClose={closeAllPopups}
        tipText='You are successfully registered to the site!'
        tipIcon={successTipIcon}
      />

      <InfoTooltip
        name='failed-tip'
        isOpen={isInfoTooltipFailed}
        onClose={closeAllPopups}
        tipText='Something is not working... Please check your info and try again.'
        tipIcon={failedTipIcon}
      />

    </div>

  );
}
// <=====

export default App;
