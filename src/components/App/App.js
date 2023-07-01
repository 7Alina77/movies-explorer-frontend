import React, { useCallback } from 'react';
import '../../pages/index.css';
import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import '../Multipurpose/Multipurpose.css';
import Landing from '../Landing/Landing';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Register from '../Auth/Register';
import Login from '../Auth/Login';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import Profile from '../Profile/Profile';
import { NewMainApi } from '../../utils/MainApi';
import {NewMoviesApi} from '../../utils/MoviesApi';
import { handleSearchMovies } from '../../utils/common';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isBurger, setIsBurger] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [savedMovies, setSavedMovies ] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [isInfoTooltipOpen ,setIsInfoTooltipOpen] = useState(false);
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] = useState({
    isSuccess: true,
    text: 'Вы успешно зарегистрировались!'
  });

  const navigate = useNavigate();

  const location = useLocation();
  const path = location.pathname;

  //Проверяем, авторизован ли пользователь
  const handleSetUserData = useCallback(async () => {
    try {
      const user = await NewMainApi.getUserInfo();
      if(user) {
        setCurrentUser(user);
        setLoggedIn(true);
      }
    } catch (err) {
      console.log(`Ошибка вывода данных юзера: ${err}`)
    } finally {
      setIsLoaderActive(false);
    }
  }, []);

  useEffect(() => {
    handleSetUserData();
  },[handleSetUserData]);
 
  //Сохраняем все фильмы при поиске
  const handleGetAllMovies = useCallback(async () => {
    setIsLoaderActive(true);
    try {
      const movies = NewMoviesApi.getMovies();
      if(movies) {
        setInitialMovies(movies);
        return movies;
      }
    } catch(err) {
      setIsSuccessInfoTooltipStatus({isSuccess: false, text:'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'});
      setIsInfoTooltipOpen(true);
      console.log(`Ошибка получения фильмов: ${err}`)
    } finally {
      setIsLoaderActive(false);
    }
  }, []); 
  
  //Получаем те фильмы, которые юзер сохранил
  const handleGetSavedMovies = useCallback(async () => {
    try {
      const savedMovies = await NewMainApi.getSavedMovies();
      if(savedMovies) {
        setSavedMovies(savedMovies);
      }
    } catch(err) {
      console.log(`Ошибка получения фильмов юзера: ${err}`)
    } finally {
      setIsLoaderActive(false);
    }
  },[])

  //Если пользователь зарегистрирован - ищем фильмы, которые он сохранил
  useEffect(() => {
    if(loggedIn) {
      handleGetSavedMovies();
    }
  },[handleGetSavedMovies, loggedIn])

  const handleBurger = () => {
    setIsBurger(!isBurger);
  };

  //Сохраняем в локалсторадж состояние переключателя на каждой странице и меняем состояние кнопки
  const handleChecked = () => {
    setIsChecked(!isChecked);
    localStorage.setItem('isShortMoviesOn', !isChecked);
    if(path==='/movies') {
      localStorage.setItem('isShortMoviesOnMovies', !isChecked);
    } 
    if(path==='/saved-movies') {
      localStorage.setItem('isShortMoviesOnSavedMovies', !isChecked)
    }
  };


  //Регистрация пользователя
  async function handleRegister(name, email, pass) {
    setIsLoaderActive(true);
    try {
      const user = await NewMainApi.register(name, email, pass);
      if(user) {
        const auth = await handleAuth(email, pass);
        setCurrentUser(user);
        setLoggedIn(true);
        setIsSuccessInfoTooltipStatus({isSuccess:true, text:'Вы успешно зарегистрировались!'});
        setIsInfoTooltipOpen(true);
        navigate('/movies', {replace: true})
      }
    } catch (err) {
        setIsSuccessInfoTooltipStatus({isSuccess: false, text:'Что-то пошло не так! Попробуйте ещё раз.'});
        setIsInfoTooltipOpen(true);
        console.log(err);
      } finally {
        setIsLoaderActive(false)
      }
  }

  //Логин
  async function handleAuth(email, password) {
    setIsLoaderActive(true);
    try {
      const user = await NewMainApi.login(email, password);
      if(user) {
        const userData = await NewMainApi.getUserInfo();
        if(userData) {
          setCurrentUser(userData);
          setLoggedIn(true);
          navigate('/movies', {replace: true});
          setIsSuccessInfoTooltipStatus({isSuccess:true, text:'Вы успешно вошли в аккаунт!'});
          setIsInfoTooltipOpen(true);
        }
      }
    } catch (err) {
      setIsSuccessInfoTooltipStatus({isSuccess: false, text:'Что-то пошло не так! Попробуйте ещё раз.'});
      setIsInfoTooltipOpen(true);
      console.log(err);
    } finally {
      setIsLoaderActive(false);
    }
  }

  //Выход из профиля и обнуление стейтов
  async function handleSignOut() {
    try {
      await NewMainApi.logOut();
      setLoggedIn(false);
      setCurrentUser(null);
      localStorage.clear();
      navigate('/', {replace: true});
    } catch(err) {
      console.log(`Ошибка с выходом из аккаунта: ${err}`)
    }
  }

  //Обновляем данные юзера
  async function handleUpdateUserData(name, email) {
    setIsLoaderActive(true);
    try {
      const user = await NewMainApi.updateUserInfo(name, email);
      if (user) {
        setCurrentUser(user);
        setIsSuccessInfoTooltipStatus({isSuccess:true, text:'Данные успешно обновлены!'});
        setIsInfoTooltipOpen(true);
      }
    } catch (err) {
      setIsSuccessInfoTooltipStatus({isSuccess: false, text:'Что-то пошло не так! Попробуйте ещё раз.'});
      setIsInfoTooltipOpen(true);
      console.log(err);
    } finally {
      setIsLoaderActive(false);
    }
  }

  //Закрываем попап
  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
  }

  //Вывод трейлера по клику на карточку
  function handleCardClick(card) {
    window.open(card.trailerLink);
  }

  //Сохранение фильма
  async function handleLikeMovie(card) {
    try {
      const savedMovie = await NewMainApi.saveMovie(card);
      console.log(savedMovie);
      if(savedMovie) {
        setSavedMovies([savedMovie, ...savedMovies])
      }
    } catch(err) {
      console.log(`Ошибка лайка: ${err}`)
    }
  }

  //Удаление фильма
  async function handleCardDelete(card) {
    console.log(card)
    const movieToDelete = savedMovies.find((movie) => card.movieId === movie.id);
    console.log(movieToDelete);
    try {
      const cardToDelete = await NewMainApi.deleteMovie(movieToDelete._id);
      console.log(cardToDelete);
      if(cardToDelete) {
        setSavedMovies((data) => 
        console.log(data))
        /**data.filter((card) => {
          card._id !== movieToDelete._id
        })
        )*/
      }
    } catch(err) {
      console.log(`Ошибка удаления: ${err}`)
    }
  }

  return (
    <div className='page'>
    {isLoaderActive ? (<Preloader />) : (
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path='/' element={<Landing isLoggedIn={loggedIn} onBurgerClick={handleBurger}/>}/>
          <Route path='/movies' element={<Movies onCardLike={handleLikeMovie} onCardClick={handleCardClick} allFilms={initialMovies} onSearch={handleGetAllMovies} isChecked={isChecked} onSwitchClick={handleChecked} onBurgerClick={handleBurger} />}/>
          <Route path='/saved-movies' element={<SavedMovies onCardDelete={handleCardDelete} onCardClick={handleCardClick} allFilms={searchedMovies} onSearch={handleGetAllMovies} isChecked={isChecked} onSwitchClick={handleChecked} onBurgerClick={handleBurger} />}/>
          <Route path='/profile' element={<Profile onClick={handleSignOut} onUpdateUser={handleUpdateUserData} onBurgerClick={handleBurger} />}/>
          <Route path='/signin' element={<Login onSubmit={handleAuth}/>}/>
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
      </CurrentUserContext.Provider>
    )}
    </div>
  );
}

export default App;