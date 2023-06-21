import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import '../Multipurpose/Multipurpose.css';
import Landing from '../Landing/Landing';
import NotFound from '../NotFound/NotFound';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Register from '../Auth/Register';
import Login from '../Auth/Login';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import Profile from '../Profile/Profile';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isBurger, setIsBurger] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isInfoTooltipOpen ,setIsInfoTooltipOpen] = useState(false);
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] = useState({
    isSuccess: true,
    text: 'Вы успешно зарегистрировались!'
  });

  const navigate = useNavigate();

  const handleBurger = () => {
    setIsBurger(!isBurger);
  };

  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  function handleRegister(name, email, pass) {
    if(name && email && pass) {
      setIsSuccessInfoTooltipStatus({isSuccess:true, text:'Вы успешно зарегистрировались!'});
      setIsInfoTooltipOpen(true);
      navigate('/signin', {replace: true})
    } else {
      setIsSuccessInfoTooltipStatus({isSuccess: false, text:'Что-то пошло не так! Попробуйте ещё раз.'});
      setIsInfoTooltipOpen(true);
    }
  };

  function handleLogin(email, pass) {
    if(email && pass) {
        setLoggedIn(true);
        navigate('/movies', {replace: true})
    } else {
      setIsSuccessInfoTooltipStatus({isSuccess: false, text:'Что-то пошло не так! Попробуйте ещё раз.'});
      setIsInfoTooltipOpen(true);
    }
  };

  function handleSignOut() {
    setLoggedIn(false);
    navigate('/signin', {replace: true});
  }

  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser(updUserData) {
    console.log(updUserData);
    if(updUserData) {
      setCurrentUser(updUserData);
    } else {
      console.log(`Ошибка обновления данных профиля`)
    }
  }

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className='page'>
      <Routes>
        <Route path='/' element={<Landing onBurgerClick={handleBurger}/>}/>
        <Route path='/movies' element={<Movies isChecked={isChecked} onSwitchClick={handleChecked} onBurgerClick={handleBurger} />}/>
        <Route path='/saved-movies' element={<SavedMovies isChecked={isChecked} onSwitchClick={handleChecked} onBurgerClick={handleBurger} />}/>
        <Route path='/profile' element={<Profile onClick={handleSignOut} onUpdateUser={handleUpdateUser} onBurgerClick={handleBurger} />}/>
        <Route path='/signin' element={<Login onSubmit={handleLogin}/>}/>
        <Route path='/signup' element={<Register onSubmit={handleRegister}/>}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
      <BurgerMenu isBurger={isBurger} onClose={handleBurger}/>
      <InfoTooltip 
        name = 'register'
        isOpen = {isInfoTooltipOpen}
        onClose = {closeAllPopups}
        isSuccessInfoTooltipStatus = {isSuccessInfoTooltipStatus}
      />
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;