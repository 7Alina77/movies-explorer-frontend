import './MoviesCardList.css';
import React, { useCallback } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import { handleFilterMoviesByTime, handleSearchMovies } from '../../utils/common';

function MoviesCardList({isLoading,  isCheckedOnMovies, isCheckedOnSavedMovies, allSearchedFilms, filteredMovies, shortFilms, onCardLike, onCardClick, onCardDelete, allSavedFilms}) {
  const location = useLocation();
  const path = location.pathname;
  const [filmsForRender, setFilmsForRender] = useState([]);
  const [step, setStep ] = useState(3);
  const [filmsOnDisplay, setFilmsOnDisplay] = useState(12);
  localStorage.setItem('allSavedMovies', JSON.stringify(allSavedFilms));

  //Вывод карточек относительно размера экрана
  function resizeScreen() {
    const width = window.innerWidth;
    setTimeout(() => {
      if(path ==='/movies') {
        if(width < 768) {
          setFilmsOnDisplay(8);
          setStep(2);
        }
        if(width < 480) {
          setFilmsOnDisplay(5);
          setStep(2);
        }
      } else {
        setFilmsOnDisplay(filmsForRender.length);
      }
    }, 2000);
  }

  window.addEventListener('resize', function() {
    resizeScreen();
  });

  function checkIsLiked(savedFilms, film) {
    return savedFilms.some((card) => film.id === card.movieId)
  }

  //Отрисовка на страницу относительно пути и после перезагрузки страницы
  useEffect(() => {
    if(path === '/movies') {
      if(isCheckedOnMovies === true && localStorage.getItem('moviesSearchOnMovies')) {
        const searchOnMovies = localStorage.getItem('moviesSearchOnMovies');
        setFilmsForRender(handleSearchMovies(shortFilms, searchOnMovies));
      } else if(isCheckedOnMovies === true) {
        setFilmsForRender(shortFilms);
      } else if(isCheckedOnMovies === false) {
        setFilmsForRender(filteredMovies);
      }
    }
  },[path, filteredMovies, shortFilms, isCheckedOnMovies]);

  useEffect(() => {
    if(path === '/movies') {
      if(filteredMovies === null) {
        const search = localStorage.getItem('moviesSearchOnMovies');
        if(localStorage.getItem('isCheckedShortMoviesOnMovies')) {
          const checkboxState = JSON.parse(localStorage.getItem('isCheckedShortMoviesOnMovies'));
          if(checkboxState === false && search) {
            const filteredFilmsList = JSON.parse(localStorage.getItem('filteredMoviesOnMovies'));
            setFilmsForRender(filteredFilmsList);
          } else if(checkboxState === false) {
            setFilmsForRender(JSON.parse(localStorage.getItem('allMovies')))
          } else if(checkboxState === true && search) {
            const shortMovies = JSON.parse(localStorage.getItem('shortMoviesOnMovies'))
            const shortFilteredFilms = handleSearchMovies(shortMovies, search);
            setFilmsForRender(shortFilteredFilms);
          } else if(checkboxState === true) {
            setFilmsForRender(JSON.parse(localStorage.getItem('shortMoviesOnMovies')));
          }
        }
      }
    }
  }, [filteredMovies, path, isCheckedOnMovies, shortFilms]);

  useEffect(() => {
    if(path === '/saved-movies') {
      const savedMovies = JSON.parse(localStorage.getItem('allSavedMovies'));
      const searchOnSavedMovies = localStorage.getItem('moviesSearchOnSavedMovies');
      const isCheckedShortMoviesOnSavedMovies = JSON.parse(localStorage.getItem('isCheckedShortMoviesOnSavedMovies'));
      if(isCheckedOnSavedMovies === true) {
        const shortSavedFilms = handleFilterMoviesByTime(allSavedFilms);
        setFilmsForRender(shortSavedFilms);
      } else {
        if(searchOnSavedMovies) {
          const filteredSavedMovies = handleSearchMovies(allSavedFilms, searchOnSavedMovies);
          setFilmsForRender(filteredSavedMovies);
        } else {
          setFilmsForRender(allSavedFilms);
          console.log(searchOnSavedMovies);
        }
      }
    }
  },[path, allSavedFilms, isCheckedOnSavedMovies]);

  useEffect(() => {
    if(localStorage.getItem('allSavedMovies') && localStorage.getItem('isCheckedShortMoviesOnSavedMovies')) {
      const savedMovies = JSON.parse(localStorage.getItem('allSavedMovies'));
      const isCheckedShortMoviesOnSavedMovies = JSON.parse(localStorage.getItem('isCheckedShortMoviesOnSavedMovies'));
      if(isCheckedShortMoviesOnSavedMovies === true) {
        const shortSavedMovies = handleFilterMoviesByTime(allSavedFilms)
        setFilmsForRender(shortSavedMovies);
      }
    } else if(localStorage.getItem('isCheckedShortMoviesOnSavedMovies') && localStorage.getItem('moviesSearchOnSavedMovies')) {
      const isCheckedShortMoviesOnSavedMovies = JSON.parse(localStorage.getItem('isCheckedShortMoviesOnSavedMovies'));
      const search = localStorage.getItem('moviesSearchOnSavedMovies');
      console.log(search);
      if(isCheckedShortMoviesOnSavedMovies === false) {
        const search = localStorage.getItem('moviesSearchOnSavedMovies');
        console.log(search);
      }
    }
  },[allSavedFilms]);

  //Удаление карточки
  async function handleOnCardDelete(cardToDelete) {
    onCardDelete(cardToDelete)
    const newFilmsForRender = await filmsForRender.filter((film) => JSON.stringify(film) !== JSON.stringify(cardToDelete));
  }

  return (
    <section className='movies-list'>
      {isLoading && <Preloader/>}
      {(!filmsForRender || filmsForRender.length === 0) ? (
        <p className='movies-list__empty'>Упс! Фильмы не найдены</p>
      ) : (
        <>
          <div className='movies-list__items'>
            {filmsForRender && (
              filmsForRender.slice(0, filmsOnDisplay).map((card) => { 
                return (
                <MoviesCard 
                  isLiked = {checkIsLiked(allSavedFilms, card)}
                  onCardLike={onCardLike}
                  onCardClick={onCardClick}
                  onCardDelete={handleOnCardDelete}
                  key = {card.id || card.movieId}
                  card = {card}
                  country = {card.country}
                  director = {card.director}
                  duration = {card.duration}
                  year = {card.year}
                  description = {card.description}
                  image = {card.image}
                  trailerLink = {card.trailerLink}
                  thumbnail = {card.thumbnail}
                  owner = {card.owner}
                  movieId = {card.movieId}
                  nameRU = {card.nameRU}
                  nameEN = {card.nameEN} 
                />)
              })
            )}
          </div>
          {(path === '/movies' && ((filmsForRender >3 || filmsForRender.length > 3) && ( filmsForRender.length > filmsOnDisplay))) && <button onClick={()=> setFilmsOnDisplay(filmsOnDisplay + step)} className='movies-list__btn link-hover' type='button'>Еще</button>}
        </>
      )
      }
    </section>
  )
}

export default MoviesCardList;