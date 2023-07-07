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
import Profile from '../Profile/Profile';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import { FilmsForRenderOnMoviesContext } from '../../contexts/FilmsForRenderOnMoviesContext';
import { NewMainApi } from '../../utils/MainApi';
import {NewMoviesApi} from '../../utils/MoviesApi';
import { handleSearchMovies } from '../../utils/common';
import {handleFilterMoviesByTime} from '../../utils/common';
import { MOVIES_URL } from '../../utils/constants';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [filmsForRender, setFilmsForRender] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isBurger, setIsBurger] = useState(false);
  const [isCheckedOnMovies, setIsCheckedOnMovies] = useState(false);
  const [isCheckedOnSavedMovies, setIsCheckedOnSavedMovies] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [shortMovies, setShortMovies] = useState([]);
  const [savedMovies, setSavedMovies ] = useState([]);
  const [isLoaderActive, setIsLoaderActive] = useState(true);
  const [errorOfAuth, setErrorOfAuth] = useState('');
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
    setIsLoaderActive(true);
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

  //Получаем те фильмы, которые юзер сохранил
  const handleGetSavedMovies = useCallback(async () => {
    try {
      const savedMovies = await NewMainApi.getSavedMovies();
      if(savedMovies) {
        setSavedMovies(savedMovies);
      }
    } catch(err) {
      console.log(`Ошибка получения фильмов юзера: ${err}`)
    } 
  },[])
 
  //Сохраняем все фильмы при поиске
  const handleGetAllMovies = useCallback(async (search) => {
    if(path ==='/movies') {
      try {
        const movies = await NewMoviesApi.getMovies();
        setInitialMovies(movies);
        localStorage.setItem('allMovies', JSON.stringify(movies));
        const shortMoviesList = handleFilterMoviesByTime(movies);
        setShortMovies(shortMoviesList);
        localStorage.setItem('shortMoviesOnMovies', JSON.stringify(shortMoviesList));
        if(movies) {
          const filteredMoviesList = await handleSearchMovies(movies, search);
          localStorage.setItem('filteredMoviesOnMovies',JSON.stringify(filteredMoviesList))
          setFilmsForRender(filteredMoviesList);
          setFilteredMovies(filteredMoviesList);
          return movies;
        }
      } catch(err) {
        setIsSuccessInfoTooltipStatus({isSuccess: false, text:'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'});
        setIsInfoTooltipOpen(true);
        console.log(`Ошибка получения фильмов: ${err}`)
      }
    } else if(path === '/saved-movies') {
      localStorage.setItem('moviesSearchOnSavedMovies', search);
    }
  }, [path]);

  //Получаем короткометражки
  useEffect(() => {
    if((!filteredMovies || filteredMovies.length < 1) && (!initialMovies || initialMovies.length <1)) {
      const allShortMoviesList = handleFilterMoviesByTime(initialMovies);
      setShortMovies(allShortMoviesList);
    }
  },[filteredMovies, initialMovies]);

  //Если пользователь зарегистрирован - ищем фильмы, которые он сохранил
  useEffect(() => {
    if(loggedIn) {
      setIsLoaderActive(true)
      handleGetSavedMovies();
      localStorage.setItem('allSavedMovies', JSON.stringify(handleGetSavedMovies()));
      setIsLoaderActive(false);
    }
  },[handleGetSavedMovies, loggedIn]);

  //Сохраняем в локалсторадж состояние переключателя на каждой странице и меняем состояние кнопки
  const handleChecked = () => {
    if(path === '/movies') {
      setIsCheckedOnMovies(!isCheckedOnMovies); 
      localStorage.setItem('isCheckedShortMoviesOnMovies', JSON.stringify(!isCheckedOnMovies));
      setShortMovies(handleFilterMoviesByTime(filteredMovies))
    }
    if(path==='/saved-movies') {
      setIsCheckedOnSavedMovies(!isCheckedOnSavedMovies);
      localStorage.setItem('isCheckedShortMoviesOnSavedMovies', !isCheckedOnSavedMovies);
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
        setErrorOfAuth(err);
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
    setIsLoaderActive(true);
    try {
      await NewMainApi.logOut();
      setLoggedIn(false);
      setCurrentUser(null);
      localStorage.clear();
      navigate('/', {replace: true});
    } catch(err) {
      console.log(`Ошибка с выходом из аккаунта: ${err}`)
    } finally {
      setIsLoaderActive(false);
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
      setErrorOfAuth(err);
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

  //Открываем/закрываем бургер меню
  const handleBurger = () => {
    setIsBurger(!isBurger);
  };

  //Сохранение фильма
  async function handleLikeMovie(card) {
    try {
      const savedMovie = await NewMainApi.saveMovie({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: `${MOVIES_URL}${card.image.url}`,
        trailerLink: card.trailerLink,
        thumbnail: `${MOVIES_URL}${card.image.formats.thumbnail.url}`,
        movieId: card.id,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
      });
      if(savedMovie) {
        setSavedMovies([savedMovie, ...savedMovies])
      }
    } catch(err) {
      console.log(`Ошибка лайка: ${err}`)
    }
  }

  //Удаление фильма
  async function handleCardDelete(card) {
    const movieToDelete = savedMovies.find((movie) => card.id === movie.movieId || card._id === movie._id );
    try {
      const cardToDelete = await NewMainApi.deleteMovie(movieToDelete._id);
      if(cardToDelete) {
        setSavedMovies((data) => data.filter((card) => card._id !== movieToDelete._id)
        )
      }
    } catch(err) {
      console.log(`Ошибка удаления: ${err}`)
    }
  };

  return (
    <div className='page'>
    {isLoaderActive ? (<Preloader />) : (
      <CurrentUserContext.Provider value={currentUser}>
        <FilmsForRenderOnMoviesContext.Provider value={filmsForRender}>
          <Routes>
            <Route path='/' element={<Landing isLoggedIn={loggedIn} onBurgerClick={handleBurger}/>}/>
            <Route path='/movies' element={
              <ProtectedRoute 
                element={Movies}
                loggedIn={loggedIn}
                allSavedFilms = {savedMovies}
                onCardLike={handleLikeMovie} 
                onCardClick={handleCardClick} 
                onCardDelete={handleCardDelete}
                allFilms={initialMovies} 
                filteredMovies={filmsForRender} 
                onSearch={handleGetAllMovies} 
                isCheckedOnMovies={isCheckedOnMovies} 
                onSwitchClick={handleChecked} 
                onBurgerClick={handleBurger} 
                shortMovies={shortMovies}
              />}
            />
            <Route path='/saved-movies' element={
              <ProtectedRoute 
                element={SavedMovies}
                loggedIn={loggedIn}
                onCardDelete={handleCardDelete} 
                onCardClick={handleCardClick} 
                allFilms={savedMovies} 
                onSearch={handleGetSavedMovies} 
                isCheckedOnSavedMovies={isCheckedOnSavedMovies} 
                onSwitchClick={handleChecked} 
                onBurgerClick={handleBurger} 
              />}
            />
            <Route path='/profile' element={
              <ProtectedRoute 
                element={Profile}
                loggedIn={loggedIn}
                errorOfAuth={errorOfAuth} 
                onClick={handleSignOut} 
                onUpdateUser={handleUpdateUserData} 
                onBurgerClick={handleBurger} 
              />}
            />
            <Route path='/signin' element={<Login onSubmit={handleAuth}/>}/>
            <Route path='/signup' element={<Register errorOfAuth={errorOfAuth} onSubmit={handleRegister}/>}/>
            <Route path='*' element={<NotFound />}/>
          </Routes>
          <BurgerMenu isBurger={isBurger} onClose={handleBurger}/>
          <InfoTooltip 
            name = 'register'
            isOpen = {isInfoTooltipOpen}
            onClose = {closeAllPopups}
            isSuccessInfoTooltipStatus = {isSuccessInfoTooltipStatus}
          />
        </FilmsForRenderOnMoviesContext.Provider>
      </CurrentUserContext.Provider>
    )}
    </div>
  );
}

export default App;